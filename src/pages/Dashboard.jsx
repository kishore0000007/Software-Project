 import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { FaBolt, FaBell, FaChartLine, FaBatteryHalf, FaCrown } from "react-icons/fa";
import { Link } from "react-router-dom";

import StatsCard from "../components/StatsCard";
import { predictionsApi } from "../services/api";
import { useLanguage } from "../context/LanguageContext";

const chartData = [
  { day: "Mon", outage: 2 },
  { day: "Tue", outage: 3 },
  { day: "Wed", outage: 1 },
  { day: "Thu", outage: 4 },
  { day: "Fri", outage: 2 },
  { day: "Sat", outage: 3 },
  { day: "Sun", outage: 1 },
];

const borderByStatus = {
  High: "border-red-500",
  Medium: "border-yellow-500",
  Low: "border-blue-500",
};

const Dashboard = () => {
  const { t } = useLanguage();
  const [topAreas, setTopAreas] = useState([]);
  const [plan, setPlan] = useState(null);
  const [limit, setLimit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    predictionsApi
      .getAll()
      .then((data) => {
        setTopAreas(data.predictions.slice(0, 5));
        setPlan(data.plan);
        setLimit(data.limit);
      })
      .catch(() => setTopAreas([]))
      .finally(() => setLoading(false));
  }, []);

  const highestRisk = topAreas.find((a) => !a.locked);
  const todaysPrediction = highestRisk ? highestRisk.status : "—";
  const areaStatus =
    highestRisk?.status === "High" ? "Outage Likely" : "Power Available";
  const isLimited = limit !== null;
  return (
    <div className="w-full space-y-6">

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
          {t("dashboard")}
        </h1>

        <p className="mt-1 text-gray-500 dark:text-slate-400">
          {t("customerDashboardDesc")}
        </p>
      </div>

      {/* Plan usage banner */}
      {isLimited && (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-blue-200 bg-blue-50 px-5 py-4 dark:border-blue-900/50 dark:bg-blue-500/10">
          <div className="flex items-center gap-3">
            <FaCrown className="text-lg text-blue-600 dark:text-blue-400" />
            <p className="text-sm text-blue-800 dark:text-blue-300">
              You're on the <span className="font-semibold">{plan}</span> plan —{" "}
              {topAreas.filter((a) => !a.locked).length} area(s) unlocked.
            </p>
          </div>
          <Link
            to="/subscription"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            {t("upgradePlan")}
          </Link>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

        <StatsCard
          title={t("todaysPrediction")}
          value={todaysPrediction}
          color="bg-blue-600"
          icon={<FaChartLine />}
        />

        <StatsCard
          title={t("highestRiskArea")}
          value={areaStatus}
          color="bg-green-600"
          icon={<FaBolt />}
        />

        <StatsCard
          title={t("backupPowerStat")}
          value="4.5 Hours"
          color="bg-yellow-500"
          icon={<FaBatteryHalf />}
        />

        <StatsCard
          title={t("alertsStat")}
          value="2 Active"
          color="bg-red-500"
          icon={<FaBell />}
        />

      </div>

      {/* Chart & Alerts */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* Chart */}
        <div className="xl:col-span-2 rounded-2xl bg-white p-6 shadow dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800">

          <h2 className="mb-6 text-xl font-semibold text-slate-800 dark:text-slate-100">
            {t("weeklyPredictionTrend")}
          </h2>

          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="outage"
                stroke="#2563eb"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>

        </div>

        {/* Alerts */}
        <div className="rounded-2xl bg-white p-6 shadow dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800">

          <h2 className="mb-6 text-xl font-semibold text-slate-800 dark:text-slate-100">
            {t("topAtRiskAreas")}
          </h2>

          <div className="space-y-5">

            {loading && (
              <p className="text-sm text-slate-400 dark:text-slate-500">Loading live areas…</p>
            )}

            {!loading && topAreas.length === 0 && (
              <p className="text-sm text-slate-400 dark:text-slate-500">No live data available.</p>
            )}

            {topAreas.slice(0, 3).map((area) =>
              area.locked ? (
                <div key={area.areaId} className="border-l-4 border-slate-200 pl-4 dark:border-slate-700">
                  <h3 className="font-semibold text-slate-400">{area.name}</h3>
                  <Link to="/subscription" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
                    Upgrade to view
                  </Link>
                </div>
              ) : (
                <div
                  key={area.areaId}
                  className={`border-l-4 pl-4 ${borderByStatus[area.status]}`}
                >
                  <h3 className="font-semibold dark:text-slate-100">{area.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-slate-400">
                    {area.status} risk · {area.riskScore}/100
                  </p>
                </div>
              )
            )}

          </div>

        </div>

      </div>

      {/* Live Area Overview */}
      <div className="rounded-2xl bg-white p-6 shadow dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800">

        <h2 className="mb-6 text-xl font-semibold text-slate-800 dark:text-slate-100">
          {t("liveAreaRiskOverview")}
        </h2>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-slate-100 dark:bg-slate-800">

              <tr>

                <th className="px-4 py-3 text-left dark:text-slate-200">Area</th>
                <th className="px-4 py-3 text-left dark:text-slate-200">Zone</th>
                <th className="px-4 py-3 text-left dark:text-slate-200">Risk</th>
                <th className="px-4 py-3 text-left dark:text-slate-200">Confidence</th>

              </tr>

            </thead>

            <tbody>

              {topAreas.map((area) =>
                area.locked ? (
                  <tr key={area.areaId} className="border-b bg-slate-50/60 dark:border-slate-800 dark:bg-slate-800/30">
                    <td className="px-4 py-4 font-medium text-slate-400">{area.name}</td>
                    <td className="px-4 text-slate-400">{area.zone}</td>
                    <td className="px-4" colSpan={2}>
                      <Link to="/subscription" className="text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400">
                        Upgrade to unlock
                      </Link>
                    </td>
                  </tr>
                ) : (
                  <tr
                    key={area.areaId}
                    className="border-b hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
                  >
                    <td className="px-4 py-4 font-medium dark:text-slate-100">{area.name}</td>
                    <td className="px-4 text-slate-500 dark:text-slate-400">{area.zone}</td>
                    <td className="px-4 dark:text-slate-300">{area.status} · {area.riskScore}</td>
                    <td className="px-4 text-slate-500 dark:text-slate-400">{area.confidence}%</td>
                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;