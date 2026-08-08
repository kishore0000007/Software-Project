  import {
  FaBuilding,
  FaUsers,
  FaMoneyBillWave,
  FaCreditCard,
  FaChartLine,
  FaBell,
  FaRobot,
  FaBatteryHalf,
} from "react-icons/fa";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import AdminStatsCard from "../components/AdminStatsCard";
import { useLanguage } from "../context/LanguageContext";

import {
  stats,
  revenueData,
  subscriptionData,
} from "../data/adminData";

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#dc2626",
];

const formatTaka = (value) => `৳${Number(value).toLocaleString("en-IN")}`;

const AdminDashboard = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
          {t("adminDashboard")}
        </h1>

        <p className="text-gray-500 mt-2 dark:text-slate-400">
          Monitor platform usage, subscriptions and revenue.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <AdminStatsCard
          title="Total Companies"
          value={stats.totalCompanies}
          color="bg-blue-600"
          icon={<FaBuilding />}
        />

        <AdminStatsCard
          title="Total Users"
          value={stats.totalUsers}
          color="bg-green-600"
          icon={<FaUsers />}
        />

        <AdminStatsCard
          title="Active Plans"
          value={stats.activeSubscriptions}
          color="bg-purple-600"
          icon={<FaCreditCard />}
        />

        <AdminStatsCard
          title="Monthly Revenue"
          value={`৳${stats.monthlyRevenue.toLocaleString("en-BD")}`}
          color="bg-orange-500"
          icon={<FaMoneyBillWave />}
        />

        <AdminStatsCard
          title="Yearly Revenue"
          value={`৳${stats.yearlyRevenue.toLocaleString("en-BD")}`}
          color="bg-indigo-600"
          icon={<FaChartLine />}
        />

        <AdminStatsCard
          title="Predictions Today"
          value={stats.predictionsToday}
          color="bg-cyan-600"
          icon={<FaRobot />}
        />

        <AdminStatsCard
          title="Notifications"
          value={stats.notificationsSent}
          color="bg-red-500"
          icon={<FaBell />}
        />

        <AdminStatsCard
          title="Backup Systems"
          value={stats.activeGenerators}
          color="bg-emerald-600"
          icon={<FaBatteryHalf />}
        />

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Revenue Chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-lg p-6 dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800">

          <h2 className="text-xl font-semibold mb-6 dark:text-slate-100">
            Monthly Revenue
          </h2>

          <ResponsiveContainer width="100%" height={320}>

            <BarChart data={revenueData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip formatter={(value) => formatTaka(value)} />

              <Bar
                dataKey="revenue"
                fill="#2563eb"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        {/* Subscription Pie Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800">

          <h2 className="text-xl font-semibold mb-6 dark:text-slate-100">
            Subscription Distribution
          </h2>

          <ResponsiveContainer width="100%" height={320}>

            <PieChart>

              <Pie
                data={subscriptionData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {subscriptionData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;