import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaChevronDown,
  FaSignOutAlt,
  FaMoon,
  FaSun,
  FaGlobe,
} from "react-icons/fa";
import { adminAlerts } from "../data/adminData";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

const levelColor = {
  high: "bg-red-500",
  medium: "bg-yellow-500",
  low: "bg-emerald-500",
};

// Key used to remember which alerts this admin has already seen, so the
// bell badge only counts genuinely new/unread alerts (shared with the
// Alert Channels page via the same `adminAlerts` data source).
const READ_KEY = "adminReadAlertIds";

const getReadIds = () => {
  try {
    return JSON.parse(localStorage.getItem(READ_KEY) || "[]");
  } catch {
    return [];
  }
};

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [readIds, setReadIds] = useState(getReadIds);

  const profileRef = useRef(null);
  const notifRef = useRef(null);

  const unreadCount = adminAlerts.filter((a) => !readIds.includes(a.id)).length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const openNotifications = () => {
    setNotifOpen((v) => {
      const next = !v;
      if (next) {
        // Mark everything currently shown as read once the dropdown is opened.
        const allIds = adminAlerts.map((a) => a.id);
        localStorage.setItem(READ_KEY, JSON.stringify(allIds));
        setReadIds(allIds);
      }
      return next;
    });
    setProfileOpen(false);
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-6 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          {t("adminDashboard")}
        </h2>
        <p className="text-sm text-gray-500 dark:text-slate-400">{t("systemOverview")}</p>
      </div>

      <div className="flex items-center gap-5">
        {/* Language toggle */}
        <button
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          onClick={toggleLanguage}
          aria-label="Toggle language"
          title={language === "en" ? "বাংলায় দেখুন" : "Switch to English"}
        >
          <FaGlobe />
          {language === "en" ? "EN" : "বাং"}
        </button>

        {/* Theme toggle */}
        <button
          className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          title={theme === "dark" ? t("lightMode") : t("darkMode")}
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            className="relative text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            onClick={openNotifications}
            aria-label="Notifications"
          >
            <FaBell className="text-xl" />
            {unreadCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold leading-none text-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="animate-fade-in absolute right-0 mt-3 w-80 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {t("notifications")}
                </h3>
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                  {adminAlerts.length}
                </span>
              </div>

              {adminAlerts.length > 0 ? (
                <ul className="max-h-72 divide-y divide-slate-50 overflow-y-auto dark:divide-slate-700">
                  {adminAlerts.map((alert) => (
                    <li
                      key={alert.id}
                      className="flex gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                    >
                      <span
                        className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${levelColor[alert.level]}`}
                      />
                      <div>
                        <p className="text-sm text-slate-700 dark:text-slate-200">{alert.message}</p>
                        <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">{alert.time}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="px-4 py-6 text-center text-sm text-slate-400">
                  {t("noNewNotifications")}
                </p>
              )}

              <button
                onClick={() => {
                  setNotifOpen(false);
                  navigate("/admin/notifications");
                }}
                className="w-full border-t border-slate-100 py-2.5 text-center text-sm font-medium text-blue-600 hover:bg-slate-50 dark:border-slate-700 dark:text-blue-400 dark:hover:bg-slate-700/50"
              >
                {t("viewAllNotifications")}
              </button>
            </div>
          )}
        </div>

        <div className="relative" ref={profileRef}>
          <button
            className="flex items-center gap-3"
            onClick={() => {
              setProfileOpen((v) => !v);
              setNotifOpen(false);
            }}
          >
            <img
              src="https://i.pravatar.cc/150?u=system-admin"
              alt="Admin portrait"
              className="h-9 w-9 rounded-full border-2 border-white object-cover shadow"
            />
            <div className="text-left">
              <p className="font-semibold leading-tight dark:text-slate-100">{t("systemAdmin")}</p>
              <p className="text-sm text-gray-500 dark:text-slate-400">{t("administrator")}</p>
            </div>
            <FaChevronDown
              className={`text-xs text-slate-400 transition-transform ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {profileOpen && (
            <div className="animate-fade-in absolute right-0 mt-3 w-48 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
              >
                <FaSignOutAlt /> {t("logout")}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
