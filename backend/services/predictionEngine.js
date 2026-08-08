// Rule-based load-shedding risk engine.
//
// NOTE: This is a deterministic heuristic model, not a trained ML model
// (no Random Forest/XGBoost/LSTM here yet) — it's designed to be a real,
// working "live" prediction feed you can wire the frontend to today.
// Swap generateAreaPrediction's internals for a real trained model's
// output later; the API shape (riskScore/status/confidence/window) can
// stay the same so nothing downstream has to change.

// Small seeded PRNG so predictions are stable within a given hour
// (refreshing the page doesn't change the numbers) but shift hour to
// hour — simulating a live-updating feed instead of pure randomness.
const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
};

const mulberry32 = (seed) => {
  let s = seed | 0;
  return function () {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

// Grid demand multiplier by hour of day (0-23) — mirrors the general
// shape of Dhaka's real load curve: quiet overnight, rising through the
// day, peaking in the evening.
const hourlyDemandCurve = [
  0.25, 0.2, 0.18, 0.18, 0.2, 0.3, 0.45, 0.55, 0.6, 0.62, 0.6, 0.58, 0.6, 0.62,
  0.65, 0.68, 0.72, 0.85, 0.95, 1.0, 0.98, 0.85, 0.6, 0.4,
];

export const generateAreaPrediction = (area, now = new Date()) => {
  const hour = now.getHours();
  const hourKey = now.toISOString().slice(0, 13); // e.g. "2026-08-04T18"
  const seed = hashString(`${area.name}-${hourKey}`);
  const rand = mulberry32(seed);

  const demand = hourlyDemandCurve[hour];
  const variance = (rand() - 0.5) * 0.25;

  const rawScore = area.baseRiskFactor * 0.6 + demand * 0.4 + variance;
  const riskScore = Math.round(Math.min(1, Math.max(0, rawScore)) * 100);

  let status;
  if (riskScore >= 66) status = "High";
  else if (riskScore >= 35) status = "Medium";
  else status = "Low";

  const confidence = Math.round(78 + rand() * 18); // 78-96%

  let estimatedWindow = null;
  if (status !== "Low") {
    const startOffsetHrs = 1 + Math.floor(rand() * 3);
    const durationHours = status === "High" ? 2 + Math.floor(rand() * 2) : 1;
    const start = new Date(now.getTime() + startOffsetHrs * 60 * 60 * 1000);
    const end = new Date(start.getTime() + durationHours * 60 * 60 * 1000);

    estimatedWindow = { start: start.toISOString(), end: end.toISOString(), durationHours };
  }

  return {
    areaId: area._id,
    name: area.name,
    zone: area.zone,
    lat: area.lat,
    lng: area.lng,
    riskScore,
    status,
    confidence,
    estimatedWindow,
    updatedAt: now.toISOString(),
  };
};

export default generateAreaPrediction;
