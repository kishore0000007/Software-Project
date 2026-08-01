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

const cards = [
  {
    title: "Today's Prediction",
    value: "Likely",
    color: "bg-blue-600",
    icon: <FaChartLine />,
  },
  {
    title: "Area Status",
    value: "Power Available",
    color: "bg-green-600",
    icon: <FaBolt />,
  },
  {
    title: "Backup Power",
    value: "4.5 Hours",
    color: "bg-yellow-500",
    icon: <FaBatteryHalf />,
  },
  {
    title: "Alerts",
    value: "2 Active",
    color: "bg-red-500",
    icon: <FaBell />,
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-gray-500">
          Monitor your business electricity status and AI predictions.
        </p>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {cards.map((card) => (
          <div
            key={card.title}
            className={`${card.color} text-white rounded-xl p-6 shadow-lg`}
          >
            <div className="flex justify-between items-center">

              <div>

                <p className="text-sm opacity-80">
                  {card.title}
                </p>

                <h2 className="text-2xl font-bold mt-2">
                  {card.value}
                </h2>

              </div>

              <div className="text-4xl opacity-80">
                {card.icon}
              </div>

            </div>
          </div>
        ))}

      </div>

      {/* Chart + Alerts */}

      <div className="grid lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-5">
            Weekly Prediction Trend
          </h2>

          <ResponsiveContainer width="100%" height={300}>
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

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-5">
            Recent Alerts
          </h2>

          <div className="space-y-4">

            <div className="border-l-4 border-red-500 pl-4">
              <p className="font-semibold">
                Mirpur
              </p>
              <p className="text-gray-500 text-sm">
                Outage expected at 5:00 PM
              </p>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4">
              <p className="font-semibold">
                Uttara
              </p>
              <p className="text-gray-500 text-sm">
                High Grid Load
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <p className="font-semibold">
                Dhanmondi
              </p>
              <p className="text-gray-500 text-sm">
                Prediction Updated
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-semibold mb-5">
          Recent Prediction History
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-3">Date</th>
                <th className="text-left py-3">Area</th>
                <th className="text-left py-3">Prediction</th>
                <th className="text-left py-3">Duration</th>

              </tr>

            </thead>

            <tbody>

              {history.map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="py-4">{item.date}</td>
                  <td>{item.area}</td>
                  <td>{item.prediction}</td>
                  <td>{item.duration}</td>
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