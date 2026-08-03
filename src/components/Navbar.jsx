import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaBell,
  FaSearch,
  FaChevronDown,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const recentAlerts = [
  { id: 1, message: "Mirpur outage expected at 5:00 PM", time: "5 min ago", level: "high" },
  { id: 2, message: "High grid load detected in Uttara", time: "22 min ago", level: "medium" },
  { id: 3, message: "Dhanmondi prediction updated", time: "1 hr ago", level: "low" },
];

const levelColor = {
  high: "bg-red-500",
  medium: "bg-yellow-500",
  low: "bg-emerald-500",
};

const Navbar = ({ setIsOpen }) => {
  const navigate = useNavigate();

  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [query, setQuery] = useState("");

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const companyName = storedUser.company || "ABC Company";
  const roleLabel = storedUser.role === "admin" ? "Administrator" : "Manager";
  const portraitUrl =
    storedUser.avatar || `https://i.pravatar.cc/150?u=${encodeURIComponent(companyName)}`;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      navigate(`/reports?q=${encodeURIComponent(trimmed)}`);
      setQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6">
      <button
        className="text-xl text-slate-700 lg:hidden"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
        <FaBars />
      </button>

      <div className="hidden sm:block">
        <h2 className="text-xl font-bold leading-tight text-slate-800">Dashboard</h2>
        <p className="text-xs text-slate-400">Welcome back, {companyName}</p>
      </div>

      {/* Live grid status */}
      <div className="ml-2 hidden items-center gap-2 border-l border-slate-200 pl-4 md:flex">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
        </span>
        <span className="text-xs font-medium text-slate-500">Grid Status: Stable</span>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="ml-auto hidden max-w-md flex-1 md:flex">
        <div className="relative w-full">
          <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search areas, reports..."
            className="w-full rounded-lg bg-slate-100 py-2 pl-9 pr-3 text-sm outline-none transition focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </form>

      <div className="ml-auto flex items-center gap-4 md:ml-4">
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            className="relative text-slate-600 transition hover:text-slate-900"
            onClick={() => {
              setNotifOpen((v) => !v);
              setProfileOpen(false);
            }}
            aria-label="Notifications"
          >
            <FaBell className="text-xl" />
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {notifOpen && (
            <div className="animate-fade-in absolute right-0 mt-3 w-80 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <h3 className="text-sm font-semibold text-slate-800">Notifications</h3>
                <span className="text-xs font-medium text-blue-600">{recentAlerts.length} new</span>
              </div>

              <ul className="max-h-72 divide-y divide-slate-50 overflow-y-auto">
                {recentAlerts.map((alert) => (
                  <li key={alert.id} className="flex gap-3 px-4 py-3 hover:bg-slate-50">
                    <span
                      className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${levelColor[alert.level]}`}
                    />
                    <div>
                      <p className="text-sm text-slate-700">{alert.message}</p>
                      <p className="mt-0.5 text-xs text-slate-400">{alert.time}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => {
                  setNotifOpen(false);
                  navigate("/notifications");
                }}
                className="w-full border-t border-slate-100 py-2.5 text-center text-sm font-medium text-blue-600 hover:bg-slate-50"
              >
                View all notifications
              </button>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            className="flex items-center gap-2"
            onClick={() => {
              setProfileOpen((v) => !v);
              setNotifOpen(false);
            }}
          >
            <img
              src={portraitUrl}
              alt={`${companyName} portrait`}
              className="h-9 w-9 rounded-full border-2 border-white object-cover shadow"
            />
            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold leading-tight text-slate-800">{companyName}</p>
              <p className="text-xs text-slate-400">{roleLabel}</p>
            </div>
            <FaChevronDown
              className={`hidden text-xs text-slate-400 transition-transform sm:block ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {profileOpen && (
            <div className="animate-fade-in absolute right-0 mt-3 w-56 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-xl">
              <div className="border-b border-slate-100 px-4 py-3">
                <p className="text-sm font-semibold text-slate-800">{companyName}</p>
                <p className="text-xs text-slate-400">{roleLabel}</p>
              </div>

              <button
                onClick={() => {
                  setProfileOpen(false);
                  navigate("/profile");
                }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
              >
                <FaUserCircle /> View Profile
              </button>

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 border-t border-slate-100 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
