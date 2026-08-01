import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBuilding,
  FaUsers,
  FaCreditCard,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const menu = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: <FaTachometerAlt />,
  },
  {
    name: "Companies",
    path: "/admin/companies",
    icon: <FaBuilding />,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <FaUsers />,
  },
  {
    name: "Subscriptions",
    path: "/admin/subscriptions",
    icon: <FaCreditCard />,
  },
  {
    name: "Revenue",
    path: "/admin/revenue",
    icon: <FaChartLine />,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: <FaCog />,
  },
];

const AdminSidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white flex flex-col">

      <div className="p-6 border-b border-slate-700">

        <h1 className="text-2xl font-bold text-blue-400">
          Admin Panel
        </h1>

      </div>

      <nav className="flex-1 p-4">

        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl mb-2 ${
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

        <button
          onClick={logout}
          className="w-full bg-red-600 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-red-700"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </aside>
  );
};

export default AdminSidebar;