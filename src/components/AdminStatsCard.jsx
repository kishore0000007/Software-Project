const AdminStatsCard = ({ title, value, icon, color }) => {
  return (
    <div
      className={`${color} rounded-2xl p-6 text-white shadow-lg transition hover:scale-105`}
    >
      <div className="flex justify-between items-center">

        <div>
          <p className="text-sm opacity-80">{title}</p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>
        </div>

        <div className="text-5xl opacity-80">
          {icon}
        </div>

      </div>
    </div>
  );
};

export default AdminStatsCard;