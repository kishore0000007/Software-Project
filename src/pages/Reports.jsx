import {
  BarChart,
  Bar,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", outage: 10 },
  { month: "Feb", outage: 8 },
  { month: "Mar", outage: 15 },
  { month: "Apr", outage: 6 },
];

const Reports = () => {
  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold">
        Reports & Analytics
      </h1>

      <div className="bg-white rounded-xl shadow p-6">

        <ResponsiveContainer width="100%" height={350}>

          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3"/>

            <XAxis dataKey="month"/>

            <YAxis/>

            <Tooltip/>

            <Bar dataKey="outage" fill="#2563eb"/>

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default Reports;