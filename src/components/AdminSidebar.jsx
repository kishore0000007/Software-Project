import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBuilding,
  FaUsers,
  FaCreditCard,
  FaChartLine,
  FaBell,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const menu = [
    {
      name: t("dashboard"),
      path: "/admin",
      // This is the index route for "/admin", so it must match EXACTLY
      // (see `end` below) or it stays highlighted on every other admin page.
      end: true,
      icon: <FaTachometerAlt />,
    },
    {
      name: t("companies"),
      path: "/admin/companies",
      icon: <FaBuilding />,
    },
    {
      name: t("users"),
      path: "/admin/users",
      icon: <FaUsers />,
    },
    {
      name: t("subscriptions"),
      path: "/admin/subscriptions",
      icon: <FaCreditCard />,
    },
    {
      name: t("notifications"),
      path: "/admin/notifications",
      icon: <FaBell />,
    },
    {
      name: t("revenue"),
      path: "/admin/revenue",
      icon: <FaChartLine />,
    },
    {
      name: t("settings"),
      path: "/admin/settings",
      icon: <FaCog />,
    },
  ];

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white flex flex-col dark:bg-slate-950 dark:border-r dark:border-slate-800">

      <div className="p-6 border-b border-slate-700">

        <h1 className="text-2xl font-bold text-blue-400">
          {t("adminPanel")}
        </h1>

      </div>

      <nav className="flex-1 p-4">

        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl mb-2 transition ${
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
          {t("logout")}
        </button>

      </div>

    </aside>
  );
};

export default AdminSidebar;
