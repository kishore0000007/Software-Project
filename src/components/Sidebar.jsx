 import { NavLink, useNavigate } from "react-router-dom";
import {
  FaChartPie,
  FaRobot,
  FaBell,
  FaBatteryHalf,
  FaChartBar,
  FaUser,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

const menu = [
  { name: "Dashboard", path: "/dashboard", icon: <FaChartPie /> },
  { name: "Prediction", path: "/prediction", icon: <FaRobot /> },
  { name: "Notifications", path: "/notifications", icon: <FaBell /> },
  { name: "Backup Power", path: "/backup", icon: <FaBatteryHalf /> },
  { name: "Reports", path: "/reports", icon: <FaChartBar /> },
  { name: "Profile", path: "/profile", icon: <FaUser /> },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
  className={`fixed top-0 left-0 z-40 h-screen w-64 bg-slate-900 text-white flex flex-col transition-transform duration-300
  ${isOpen ? "translate-x-0" : "-translate-x-full"}
  lg:translate-x-0`}
>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold text-blue-400">
            ⚡ PowerPredict
          </h1>

          <button
            className="lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          {menu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 py-3 rounded-xl transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;