import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaChevronDown, FaSignOutAlt } from "react-icons/fa";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-6 backdrop-blur">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Admin Dashboard</h2>
        <p className="text-sm text-gray-500">System Overview</p>
      </div>

      <div className="flex items-center gap-5">
        <button
          className="relative text-slate-600 transition hover:text-slate-900"
          onClick={() => navigate("/admin")}
          aria-label="Notifications"
        >
          <FaBell className="text-xl" />
          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="relative" ref={profileRef}>
          <button
            className="flex items-center gap-3"
            onClick={() => setProfileOpen((v) => !v)}
          >
            <img
              src="https://i.pravatar.cc/150?u=system-admin"
              alt="Admin portrait"
              className="h-9 w-9 rounded-full border-2 border-white object-cover shadow"
            />
            <div className="text-left">
              <p className="font-semibold leading-tight">System Admin</p>
              <p className="text-sm text-gray-500">Administrator</p>
            </div>
            <FaChevronDown
              className={`text-xs text-slate-400 transition-transform ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {profileOpen && (
            <div className="animate-fade-in absolute right-0 mt-3 w-48 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-xl">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
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

export default AdminNavbar;
