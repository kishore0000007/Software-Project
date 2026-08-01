 import {
  FaUsers,
  FaRobot,
  FaBell,
  FaBuilding,
} from "react-icons/fa";

const cards = [
  {
    title: "Companies",
    value: 52,
    icon: <FaBuilding />,
  },
  {
    title: "Users",
    value: 148,
    icon: <FaUsers />,
  },
  {
    title: "Predictions",
    value: 2840,
    icon: <FaRobot />,
  },
  {
    title: "Alerts Sent",
    value: 613,
    icon: <FaBell />,
  },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-xl shadow p-6"
          >

            <div className="text-blue-600 text-4xl">
              {card.icon}
            </div>

            <h2 className="mt-4 text-gray-500">
              {card.title}
            </h2>

            <p className="text-3xl font-bold">
              {card.value}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
};

export default AdminDashboard;