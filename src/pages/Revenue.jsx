import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  FaMoneyBillWave,
  FaCoins,
  FaChartLine,
  FaDownload,
} from "react-icons/fa";

import {
  monthlyRevenue,
  yearlyRevenue,
  payments,
} from "../data/adminData";
import { useLanguage } from "../context/LanguageContext";

const formatTaka = (value) => `৳${Number(value).toLocaleString("en-IN")}`;

const Revenue = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            {t("revenueOverview")}
          </h1>

          <p className="text-gray-500 dark:text-slate-400">
            {t("revenueOverviewDesc")}
          </p>

        </div>

        <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700">

          <FaDownload />

          Export Report

        </button>

      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-green-600 text-white rounded-xl p-6 shadow">

          <FaCoins className="text-4xl mb-4" />

          <h3 className="text-lg">Monthly Revenue</h3>

          <h2 className="text-3xl font-bold mt-2">
            ৳8,95,000
          </h2>

        </div>

        <div className="bg-blue-600 text-white rounded-xl p-6 shadow">

          <FaMoneyBillWave className="text-4xl mb-4" />

          <h3 className="text-lg">Yearly Revenue</h3>

          <h2 className="text-3xl font-bold mt-2">
            ৳1,07,40,000
          </h2>

        </div>

        <div className="bg-purple-600 text-white rounded-xl p-6 shadow">

          <FaChartLine className="text-4xl mb-4" />

          <h3 className="text-lg">Growth</h3>

          <h2 className="text-3xl font-bold mt-2">
            +18%
          </h2>

        </div>

      </div>

      {/* Charts */}

      <div className="grid xl:grid-cols-2 gap-6">

        <div className="bg-white rounded-xl shadow p-6 dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800">

          <h2 className="text-xl font-semibold mb-5 dark:text-slate-100">
            Monthly Revenue
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <LineChart data={monthlyRevenue}>

              <CartesianGrid strokeDasharray="3 3"/>

              <XAxis dataKey="month"/>

              <YAxis/>

              <Tooltip formatter={(value) => formatTaka(value)} />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#2563eb"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

        <div className="bg-white rounded-xl shadow p-6 dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800">

          <h2 className="text-xl font-semibold mb-5 dark:text-slate-100">
            Yearly Revenue
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={yearlyRevenue}>

              <CartesianGrid strokeDasharray="3 3"/>

              <XAxis dataKey="year"/>

              <YAxis/>

              <Tooltip formatter={(value) => formatTaka(value)} />

              <Bar
                dataKey="revenue"
                fill="#16a34a"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Payments */}

      <div className="bg-white rounded-xl shadow p-6 dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800">

        <h2 className="text-xl font-semibold mb-5 dark:text-slate-100">
          Recent Payments
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b dark:border-slate-800">

                <th className="text-left py-3 dark:text-slate-200">Company</th>
                <th className="text-left py-3 dark:text-slate-200">Plan</th>
                <th className="text-left py-3 dark:text-slate-200">Amount</th>
                <th className="text-left py-3 dark:text-slate-200">Date</th>
                <th className="text-left py-3 dark:text-slate-200">Status</th>

              </tr>

            </thead>

            <tbody>

              {payments.map((payment) => (

                <tr
                  key={payment.id}
                  className="border-b hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
                >

                  <td className="py-4 dark:text-slate-300">{payment.company}</td>

                  <td className="dark:text-slate-300">{payment.plan}</td>

                  <td className="dark:text-slate-300">{payment.amount}</td>

                  <td className="dark:text-slate-300">{payment.date}</td>

                  <td>

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        payment.status === "Paid"
                          ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
                      }`}
                    >
                      {payment.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Revenue;
