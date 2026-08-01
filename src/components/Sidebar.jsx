import {
  FaChartPie,
  FaRobot,
  FaBell,
  FaBatteryHalf,
  FaChartBar,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaChartPie />,
    },
    {
      name: "Prediction",
      path: "/prediction",
      icon: <FaRobot />,
    },
    {
      name: "Notifications",
      path: "/notifications",
      icon: <FaBell />,
    },
    {
      name: "Backup Power",
      path: "/backup",
      icon: <FaBatteryHalf />,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <FaChartBar />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <FaUser />,
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">

      <div className="p-6 border-b border-slate-700">

        <h1 className="text-2xl font-bold">
          ⚡ PowerPredict
        </h1>

      </div>

      <nav className="flex-1 p-4">

        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition
              ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`
            }
          >
            {item.icon}

            {item.name}

          </NavLink>
        ))}

      </nav>

      <div className="p-4 border-t border-slate-700">

        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-red-600 transition">

          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </aside>
  );
};

export default Sidebar;