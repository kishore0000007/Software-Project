import { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  FaRobot,
  FaMapMarkerAlt,
  FaClock,
  FaSearch,
  FaSyncAlt,
  FaLock,
  FaCrown,
} from "react-icons/fa";
import { predictionsApi } from "../services/api";

const statusStyles = {
  High: "bg-red-100 text-red-700 border-red-200",
  Medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Low: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

const formatWindow = (window) => {
  if (!window) return "No outage expected";
  const start = new Date(window.start);
  const end = new Date(window.end);
  const fmt = (d) => d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  return `${fmt(start)} – ${fmt(end)} (${window.durationHours}h)`;
};

const Prediction = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeQuery = searchParams.get("q") || "";

  const [searchTerm, setSearchTerm] = useState(activeQuery);
  const [predictions, setPredictions] = useState([]);
  const [plan, setPlan] = useState(null);
  const [limit, setLimit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  const [selectedArea, setSelectedArea] = useState("");
  const [selectedResult, setSelectedResult] = useState(null);
  const [lockedUpgrade, setLockedUpgrade] = useState(null); // { message } when a locked area was requested
  const [predicting, setPredicting] = useState(false);

  const fetchPredictions = async (query) => {
    setLoading(true);
    setError("");

    try {
      const data = await predictionsApi.getAll(query);
      setPredictions(data.predictions);
      setPlan(data.plan);
      setLimit(data.limit);
      setLastUpdated(new Date());

      setSelectedArea((current) => {
        if (current && data.predictions.some((p) => p.name === current)) return current;
        return data.predictions[0]?.name || "";
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Reload whenever the URL's ?q= changes (e.g. a search from the Navbar)
  useEffect(() => {
    setSearchTerm(activeQuery);
    fetchPredictions(activeQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeQuery]);

  // Auto-refresh every 60s so the feed feels live without losing the current search.
  useEffect(() => {
    const interval = setInterval(() => fetchPredictions(activeQuery), 60000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    setSearchParams(trimmed ? { q: trimmed } : {});
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSearchParams({});
  };

  const handlePredict = async () => {
    if (!selectedArea) return;
    setPredicting(true);
    setError("");
    setLockedUpgrade(null);
    setSelectedResult(null);

    try {
      const data = await predictionsApi.getOne(selectedArea);
      setSelectedResult(data.prediction);
    } catch (err) {
      if (err.data?.locked) {
        setLockedUpgrade({ message: err.message });
      } else {
        setError(err.message);
      }
    } finally {
      setPredicting(false);
    }
  };

  const areaOptions = useMemo(
    () => [...predictions].sort((a, b) => a.name.localeCompare(b.name)),
    [predictions]
  );

  const isLimited = limit !== null;
  const unlockedCount = predictions.filter((p) => !p.locked).length;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">AI Load Shedding Prediction</h1>
          <p className="mt-2 text-gray-500 dark:text-slate-400">
            Live risk forecast across {predictions.length || "…"} Dhaka areas.
          </p>
        </div>

        {lastUpdated && (
          <div className="flex items-center gap-2 text-sm text-slate-400 dark:text-slate-500">
            <FaSyncAlt className={loading ? "animate-spin" : ""} />
            Updated {lastUpdated.toLocaleTimeString()}
          </div>
        )}
      </div>

      {/* Plan limit banner */}
      {isLimited && (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-blue-200 bg-blue-50 px-5 py-4 dark:border-blue-900/50 dark:bg-blue-500/10">
          <div className="flex items-center gap-3">
            <FaCrown className="text-lg text-blue-600 dark:text-blue-400" />
            <p className="text-sm text-blue-800 dark:text-blue-300">
              You're on the <span className="font-semibold">{plan}</span> plan —{" "}
              {unlockedCount} of {predictions.length} areas unlocked.
            </p>
          </div>
          <Link
            to="/subscription"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Upgrade Plan
          </Link>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-500/10 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Search */}
      <form onSubmit={handleSearchSubmit} className="rounded-xl bg-white p-6 shadow dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800">
        <label className="mb-2 block font-semibold dark:text-slate-200">Search an area</label>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="e.g. Banani, Bashundhara, Mirpur…"
              className="w-full rounded-lg border py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Search
          </button>

          {activeQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="rounded-lg border px-4 py-3 text-slate-500 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              Clear
            </button>
          )}
        </div>
      </form>

      {/* Predict a specific area */}
      <div className="rounded-xl bg-white p-6 shadow dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-semibold dark:text-slate-200">Select Area</label>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full rounded-lg border p-3 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              {areaOptions.length === 0 && <option value="">No areas available</option>}
              {areaOptions.map((a) => (
                <option key={a.areaId} value={a.name}>
                  {a.locked ? `🔒 ${a.name} (upgrade to unlock)` : a.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handlePredict}
              disabled={predicting || !selectedArea}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 disabled:bg-blue-400"
            >
              <FaRobot />
              {predicting ? "Predicting…" : "Predict Now"}
            </button>
          </div>
        </div>
      </div>

      {lockedUpgrade && (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 dark:border-amber-900/50 dark:bg-amber-500/10">
          <div className="flex items-center gap-3">
            <FaLock className="text-lg text-amber-600 dark:text-amber-400" />
            <p className="text-sm text-amber-800 dark:text-amber-300">{lockedUpgrade.message}</p>
          </div>
          <Link
            to="/subscription"
            className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600"
          >
            View Plans
          </Link>
        </div>
      )}

      {selectedResult && (
        <div className="rounded-xl bg-white p-6 shadow dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800">
          <h2 className="mb-5 text-xl font-bold dark:text-slate-100">Prediction Result</h2>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-blue-100 p-5 dark:bg-blue-500/10">
              <FaMapMarkerAlt className="mb-2 text-2xl text-blue-600" />
              <p className="text-gray-500 dark:text-slate-400">Area</p>
              <h3 className="font-bold dark:text-slate-100">{selectedResult.name}</h3>
              <p className="mt-1 text-xs text-gray-400 dark:text-slate-500">{selectedResult.zone}</p>
            </div>

            <div className={`rounded-lg border p-5 ${statusStyles[selectedResult.status]}`}>
              <FaRobot className="mb-2 text-2xl" />
              <p className="opacity-70 dark:text-slate-300">Risk</p>
              <h3 className="font-bold dark:text-slate-100">
                {selectedResult.status} ({selectedResult.riskScore}/100)
              </h3>
            </div>

            <div className="rounded-lg bg-yellow-100 p-5 dark:bg-yellow-500/10">
              <FaClock className="mb-2 text-2xl text-yellow-600" />
              <p className="text-gray-500 dark:text-slate-400">Estimated Window</p>
              <h3 className="text-sm font-bold dark:text-slate-100">{formatWindow(selectedResult.estimatedWindow)}</h3>
            </div>

            <div className="rounded-lg bg-green-100 p-5 dark:bg-green-500/10">
              <p className="text-gray-500 dark:text-slate-400">Confidence</p>
              <h3 className="text-3xl font-bold text-green-600 dark:text-green-400">{selectedResult.confidence}%</h3>
            </div>
          </div>
        </div>
      )}

      {/* Live area table */}
      <div className="rounded-xl bg-white p-6 shadow dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800">
        <h2 className="mb-5 text-xl font-bold dark:text-slate-100">
          {activeQuery ? `Search results for "${activeQuery}"` : "Live Risk Across Dhaka"}
        </h2>

        {loading && predictions.length === 0 ? (
          <p className="text-sm text-slate-400 dark:text-slate-500">Loading live predictions…</p>
        ) : predictions.length === 0 ? (
          <p className="text-sm text-slate-400 dark:text-slate-500">No areas matched your search.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  <th className="py-3">Area</th>
                  <th className="py-3">Zone</th>
                  <th className="py-3">Risk</th>
                  <th className="py-3">Confidence</th>
                  <th className="py-3">Estimated Window</th>
                </tr>
              </thead>

              <tbody>
                {predictions.map((p) =>
                  p.locked ? (
                    <tr key={p.areaId} className="border-b bg-slate-50/60 dark:border-slate-800 dark:bg-slate-800/30">
                      <td className="py-4 font-medium text-slate-400 dark:text-slate-500">{p.name}</td>
                      <td className="text-slate-400 dark:text-slate-500">{p.zone}</td>
                      <td colSpan={3}>
                        <Link
                          to="/subscription"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:underline"
                        >
                          <FaLock className="text-xs" /> Upgrade to unlock
                        </Link>
                      </td>
                    </tr>
                  ) : (
                    <tr key={p.areaId} className="border-b hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50">
                      <td className="py-4 font-medium dark:text-slate-100">{p.name}</td>
                      <td className="text-slate-500 dark:text-slate-400">{p.zone}</td>
                      <td>
                        <span
                          className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[p.status]}`}
                        >
                          {p.status} · {p.riskScore}
                        </span>
                      </td>
                      <td className="text-slate-500 dark:text-slate-400">{p.confidence}%</td>
                      <td className="text-sm text-slate-500 dark:text-slate-400">{formatWindow(p.estimatedWindow)}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Prediction;
