 import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  FaBolt,
  FaBell,
  FaChartLine,
  FaBatteryHalf,
} from "react-icons/fa";

import StatsCard from "../components/StatsCard";

const chartData = [
  { day: "Mon", outage: 2 },
  { day: "Tue", outage: 3 },
  { day: "Wed", outage: 1 },
  { day: "Thu", outage: 4 },
  { day: "Fri", outage: 2 },
  { day: "Sat", outage: 3 },
  { day: "Sun", outage: 1 },
];

const history = [
  {
    date: "01 Aug",
    area: "Mirpur",
    prediction: "Likely",
    duration: "2 Hours",
  },
  {
    date: "31 Jul",
    area: "Dhanmondi",
    prediction: "Low",
    duration: "30 Min",
  },
  {
    date: "30 Jul",
    area: "Uttara",
    prediction: "High",
    duration: "3 Hours",
  },
];

const Dashboard = () => {
  return (
    <div className="w-full space-y-6">

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="mt-1 text-gray-500">
          Monitor your business electricity status and AI predictions.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

        <StatsCard
          title="Today's Prediction"
          value="Likely"
          color="bg-blue-600"
          icon={<FaChartLine />}
        />

        <StatsCard
          title="Area Status"
          value="Power Available"
          color="bg-green-600"
          icon={<FaBolt />}
        />

        <StatsCard
          title="Backup Power"
          value="4.5 Hours"
          color="bg-yellow-500"
          icon={<FaBatteryHalf />}
        />

        <StatsCard
          title="Alerts"
          value="2 Active"
          color="bg-red-500"
          icon={<FaBell />}
        />

      </div>

      {/* Chart & Alerts */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* Chart */}
        <div className="xl:col-span-2 rounded-2xl bg-white p-6 shadow">

          <h2 className="mb-6 text-xl font-semibold text-slate-800">
            Weekly Prediction Trend
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
        <div className="rounded-2xl bg-white p-6 shadow">

          <h2 className="mb-6 text-xl font-semibold text-slate-800">
            Recent Alerts
          </h2>

          <div className="space-y-5">

            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-semibold">Mirpur</h3>
              <p className="text-sm text-gray-500">
                Outage expected at 5:00 PM
              </p>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4">
              <h3 className="font-semibold">Uttara</h3>
              <p className="text-sm text-gray-500">
                High Grid Load
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold">Dhanmondi</h3>
              <p className="text-sm text-gray-500">
                Prediction Updated
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Prediction History */}
      <div className="rounded-2xl bg-white p-6 shadow">

        <h2 className="mb-6 text-xl font-semibold text-slate-800">
          Recent Prediction History
        </h2>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Area</th>
                <th className="px-4 py-3 text-left">Prediction</th>
                <th className="px-4 py-3 text-left">Duration</th>

              </tr>

            </thead>

            <tbody>

              {history.map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="px-4 py-4">{item.date}</td>
                  <td className="px-4">{item.area}</td>
                  <td className="px-4">{item.prediction}</td>
                  <td className="px-4">{item.duration}</td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;