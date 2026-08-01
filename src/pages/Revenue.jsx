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
  FaDollarSign,
  FaChartLine,
  FaDownload,
} from "react-icons/fa";

import {
  monthlyRevenue,
  yearlyRevenue,
  payments,
} from "../data/adminData";

const Revenue = () => {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Revenue Analytics
          </h1>

          <p className="text-gray-500">
            Monitor business income and payment history.
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

          <FaDollarSign className="text-4xl mb-4" />

          <h3 className="text-lg">Monthly Revenue</h3>

          <h2 className="text-3xl font-bold mt-2">
            $8,950
          </h2>

        </div>

        <div className="bg-blue-600 text-white rounded-xl p-6 shadow">

          <FaMoneyBillWave className="text-4xl mb-4" />

          <h3 className="text-lg">Yearly Revenue</h3>

          <h2 className="text-3xl font-bold mt-2">
            $107,400
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

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-5">
            Monthly Revenue
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <LineChart data={monthlyRevenue}>

              <CartesianGrid strokeDasharray="3 3"/>

              <XAxis dataKey="month"/>

              <YAxis/>

              <Tooltip/>

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#2563eb"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-semibold mb-5">
            Yearly Revenue
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={yearlyRevenue}>

              <CartesianGrid strokeDasharray="3 3"/>

              <XAxis dataKey="year"/>

              <YAxis/>

              <Tooltip/>

              <Bar
                dataKey="revenue"
                fill="#16a34a"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Payments */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-semibold mb-5">
          Recent Payments
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-3">Company</th>
                <th className="text-left py-3">Plan</th>
                <th className="text-left py-3">Amount</th>
                <th className="text-left py-3">Date</th>
                <th className="text-left py-3">Status</th>

              </tr>

            </thead>

            <tbody>

              {payments.map((payment) => (

                <tr
                  key={payment.id}
                  className="border-b hover:bg-slate-50"
                >

                  <td className="py-4">{payment.company}</td>

                  <td>{payment.plan}</td>

                  <td>{payment.amount}</td>

                  <td>{payment.date}</td>

                  <td>

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        payment.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
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