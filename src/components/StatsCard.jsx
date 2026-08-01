const StatsCard = ({
  title,
  value,
  icon,
  color = "bg-blue-600",
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-slate-800 mt-2">
            {value}
          </h2>

        </div>

        <div
          className={`${color} w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
};

export default StatsCard;