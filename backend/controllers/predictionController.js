import User from "../models/User.js";
import Area from "../models/Area.js";
import { generateAreaPrediction } from "../services/predictionEngine.js";
import { getPlanLimit } from "../services/planAccess.js";

// Fetches the caller's current plan from the DB (not the JWT — the JWT is
// signed at login and would go stale the moment someone upgrades without
// logging back in). Admins always get unlimited access.
const resolvePlan = async (req) => {
  if (req.user.role === "admin") {
    return { plan: "Enterprise", limit: Infinity };
  }

  const user = await User.findById(req.user.id).select("subscription");
  const plan = user?.subscription || "Free";
  return { plan, limit: getPlanLimit(plan) };
};

// Areas beyond the plan's limit still show up (so customers can see what
// they're missing) but with prediction details stripped server-side —
// not just hidden in the UI, since a client can always inspect network
// requests.
const lockPrediction = (p) => ({
  areaId: p.areaId,
  name: p.name,
  zone: p.zone,
  locked: true,
});

// GET /api/predictions?q=banani
export const getAllPredictions = async (req, res) => {
  try {
    const q = (req.query.q || "").trim();

    const filter = q ? { name: { $regex: q, $options: "i" } } : {};
    const areas = await Area.find(filter).sort({ name: 1 });

    const now = new Date();
    const ranked = areas
      .map((area) => generateAreaPrediction(area, now))
      .sort((a, b) => b.riskScore - a.riskScore);

    const { plan, limit } = await resolvePlan(req);

    const predictions = ranked.map((p, index) =>
      index < limit ? { ...p, locked: false } : lockPrediction(p)
    );

    res.status(200).json({
      success: true,
      count: predictions.length,
      plan,
      limit: Number.isFinite(limit) ? limit : null,
      predictions,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/predictions/:id  (id can be a Mongo _id or an area name)
export const getAreaPrediction = async (req, res) => {
  try {
    const { id } = req.params;

    let found = null;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      found = await Area.findById(id);
    }

    if (!found) {
      found = await Area.findOne({ name: { $regex: `^${id}$`, $options: "i" } });
    }

    if (!found) {
      return res.status(404).json({
        success: false,
        message: "We don't have coverage for that area yet.",
      });
    }

    // Recompute the same ranking used by getAllPredictions to see whether
    // this specific area falls inside the caller's unlocked set — this
    // stops someone from bypassing the list lock by requesting a single
    // area directly.
    const now = new Date();
    const allAreas = await Area.find();
    const ranked = allAreas
      .map((a) => generateAreaPrediction(a, now))
      .sort((a, b) => b.riskScore - a.riskScore);

    const { plan, limit } = await resolvePlan(req);
    const rankIndex = ranked.findIndex((p) => String(p.areaId) === String(found._id));
    const isLocked = rankIndex !== -1 && rankIndex >= limit;

    if (isLocked) {
      return res.status(403).json({
        success: false,
        locked: true,
        plan,
        limit: Number.isFinite(limit) ? limit : null,
        message: `Your ${plan} plan unlocks ${limit} area${
          limit === 1 ? "" : "s"
        }. Upgrade to see the prediction for ${found.name}.`,
      });
    }

    const prediction = generateAreaPrediction(found, now);

    res.status(200).json({ success: true, prediction });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
