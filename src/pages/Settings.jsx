import { useState } from "react";
import {
  FaBuilding,
  FaBell,
  FaRobot,
  FaCreditCard,
  FaLock,
  FaSave,
  FaMoon,
  FaSun,
  FaGlobe,
} from "react-icons/fa";
import authApi from "../services/api";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const [settings, setSettings] = useState({
    companyName: "PowerPredict",
    supportEmail: "support@powerpredict.com",
    smsAlerts: true,
    emailAlerts: true,
    whatsappAlerts: false,
    predictionInterval: 30,
    businessPlan: 2500,
    enterprisePlan: 9999,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Settings Saved", settings);

    alert("Settings saved successfully!");
  };

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
    setPasswordMessage("");
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!passwords.current || !passwords.next || !passwords.confirm) {
      setPasswordMessage("Please fill in all fields.");
      return;
    }

    if (passwords.next !== passwords.confirm) {
      setPasswordMessage("New passwords do not match.");
      return;
    }

    setPasswordLoading(true);

    try {
      await authApi.changePassword({
        currentPassword: passwords.current,
        newPassword: passwords.next,
      });

      setPasswordMessage("Password updated successfully.");
      setPasswords({ current: "", next: "", confirm: "" });

      setTimeout(() => {
        setShowPasswordForm(false);
        setPasswordMessage("");
      }, 2000);
    } catch (err) {
      setPasswordMessage(err.message);
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
          {t("systemSettings")}
        </h1>

        <p className="text-gray-500 dark:text-slate-400">
          {t("systemSettingsDesc")}
        </p>
      </div>

      {/* Preferences (dark mode + language) */}
      <div className="bg-white rounded-xl shadow p-6 dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800">

        <div className="flex items-center gap-3 mb-6">
          {theme === "dark" ? (
            <FaSun className="text-yellow-400 text-xl" />
          ) : (
            <FaMoon className="text-indigo-500 text-xl" />
          )}
          <h2 className="text-xl font-semibold dark:text-slate-100">
            {t("preferences")}
          </h2>
        </div>

        <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">
          {t("preferencesDesc")}
        </p>

        <div className="grid md:grid-cols-2 gap-5">

          <div className="flex items-center justify-between rounded-lg border p-4 dark:border-slate-700">
            <div className="flex items-center gap-3">
              {theme === "dark" ? <FaMoon className="text-slate-400" /> : <FaSun className="text-amber-500" />}
              <span className="font-medium dark:text-slate-200">
                {theme === "dark" ? t("darkMode") : t("lightMode")}
              </span>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              role="switch"
              aria-checked={theme === "dark"}
              className={`relative h-7 w-12 rounded-full transition ${
                theme === "dark" ? "bg-blue-600" : "bg-slate-300"
              }`}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  theme === "dark" ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <FaGlobe className="text-blue-500" />
              <span className="font-medium dark:text-slate-200">{t("language")}</span>
            </div>

            <div className="flex overflow-hidden rounded-lg border dark:border-slate-600">
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`px-3 py-1.5 text-sm font-semibold transition ${
                  language === "en"
                    ? "bg-blue-600 text-white"
                    : "bg-transparent text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                }`}
              >
                {t("english")}
              </button>
              <button
                type="button"
                onClick={() => setLanguage("bn")}
                className={`px-3 py-1.5 text-sm font-semibold transition ${
                  language === "bn"
                    ? "bg-blue-600 text-white"
                    : "bg-transparent text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                }`}
              >
                {t("bangla")}
              </button>
            </div>
          </div>

        </div>

      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Company Information */}
        <div className="bg-white rounded-xl shadow p-6 dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800">

          <div className="flex items-center gap-3 mb-6">
            <FaBuilding className="text-blue-600 text-xl" />
            <h2 className="text-xl font-semibold dark:text-slate-100">
              Company Information
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block mb-2 font-medium dark:text-slate-200">
                Platform Name
              </label>

              <input
                type="text"
                name="companyName"
                value={settings.companyName}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium dark:text-slate-200">
                Support Email
              </label>

              <input
                type="email"
                name="supportEmail"
                value={settings.supportEmail}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </div>

          </div>

        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl shadow p-6 dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800">

          <div className="flex items-center gap-3 mb-6">
            <FaBell className="text-yellow-500 text-xl" />
            <h2 className="text-xl font-semibold dark:text-slate-100">
              Notification Settings
            </h2>
          </div>

          <div className="space-y-4">

            <label className="flex items-center gap-3 dark:text-slate-200">
              <input
                type="checkbox"
                name="smsAlerts"
                checked={settings.smsAlerts}
                onChange={handleChange}
              />
              SMS Alerts
            </label>

            <label className="flex items-center gap-3 dark:text-slate-200">
              <input
                type="checkbox"
                name="emailAlerts"
                checked={settings.emailAlerts}
                onChange={handleChange}
              />
              Email Alerts
            </label>

            <label className="flex items-center gap-3 dark:text-slate-200">
              <input
                type="checkbox"
                name="whatsappAlerts"
                checked={settings.whatsappAlerts}
                onChange={handleChange}
              />
              WhatsApp Alerts
            </label>

          </div>

        </div>

        {/* AI Settings */}
        <div className="bg-white rounded-xl shadow p-6 dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800">

          <div className="flex items-center gap-3 mb-6">
            <FaRobot className="text-purple-600 text-xl" />
            <h2 className="text-xl font-semibold dark:text-slate-100">
              AI Prediction
            </h2>
          </div>

          <label className="block mb-2 font-medium dark:text-slate-200">
            Prediction Interval (Minutes)
          </label>

          <input
            type="number"
            name="predictionInterval"
            value={settings.predictionInterval}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />

        </div>

        {/* Subscription */}
        <div className="bg-white rounded-xl shadow p-6 dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800">

          <div className="flex items-center gap-3 mb-6">
            <FaCreditCard className="text-green-600 text-xl" />
            <h2 className="text-xl font-semibold dark:text-slate-100">
              Subscription Pricing
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block mb-2 font-medium dark:text-slate-200">
                Business Plan (৳)
              </label>

              <input
                type="number"
                name="businessPlan"
                value={settings.businessPlan}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium dark:text-slate-200">
                Enterprise Plan (৳)
              </label>

              <input
                type="number"
                name="enterprisePlan"
                value={settings.enterprisePlan}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </div>

          </div>

        </div>

        {/* Security */}
        <div className="bg-white rounded-xl shadow p-6 dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800">

          <div className="flex items-center gap-3 mb-6">
            <FaLock className="text-red-600 text-xl" />
            <h2 className="text-xl font-semibold dark:text-slate-100">
              Security
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setShowPasswordForm((v) => !v)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
          >
            {showPasswordForm ? "Cancel" : "Change Admin Password"}
          </button>

          {showPasswordForm && (
            <div className="mt-5 max-w-md space-y-4">
              <input
                type="password"
                name="current"
                placeholder="Current password"
                value={passwords.current}
                onChange={handlePasswordChange}
                className="w-full border rounded-lg p-3 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />

              <input
                type="password"
                name="next"
                placeholder="New password"
                value={passwords.next}
                onChange={handlePasswordChange}
                className="w-full border rounded-lg p-3 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />

              <input
                type="password"
                name="confirm"
                placeholder="Confirm new password"
                value={passwords.confirm}
                onChange={handlePasswordChange}
                className="w-full border rounded-lg p-3 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />

              <button
                type="button"
                onClick={handlePasswordSubmit}
                disabled={passwordLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2.5 rounded-lg"
              >
                {passwordLoading ? "Updating..." : "Update Password"}
              </button>

              {passwordMessage && (
                <p className="text-sm text-slate-600 dark:text-slate-300">{passwordMessage}</p>
              )}
            </div>
          )}

        </div>

        {/* Save Button */}

        <div className="flex justify-end">

          <button
            type="submit"
            className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            <FaSave />
            Save Changes
          </button>

        </div>

      </form>

    </div>
  );
};

export default Settings;