import { useState } from "react";
import { FaEnvelope, FaSms, FaWhatsapp, FaBell, FaCheckCircle } from "react-icons/fa";

const defaultPrefs = { email: true, sms: false, whatsapp: false };

const recentAlerts = [
  { id: 1, message: "Mirpur outage expected at 5 PM.", level: "high" },
  { id: 2, message: "High grid load detected.", level: "medium" },
];

const Notifications = () => {
  const [prefs, setPrefs] = useState(() => {
    const saved = localStorage.getItem("notificationPrefs");
    return saved ? JSON.parse(saved) : defaultPrefs;
  });

  const [saved, setSaved] = useState(false);

  const toggle = (key) => {
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem("notificationPrefs", JSON.stringify(prefs));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Notifications</h1>
        <p className="text-gray-500">Manage your alert preferences.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow">
          <FaEnvelope className="mb-4 text-4xl text-blue-600" />
          <h2 className="text-xl font-bold">Email Alerts</h2>

          <label className="mt-6 flex items-center justify-between">
            <span>Enable</span>
            <input
              type="checkbox"
              checked={prefs.email}
              onChange={() => toggle("email")}
            />
          </label>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <FaSms className="mb-4 text-4xl text-green-600" />
          <h2 className="text-xl font-bold">SMS Alerts</h2>

          <label className="mt-6 flex items-center justify-between">
            <span>Enable</span>
            <input
              type="checkbox"
              checked={prefs.sms}
              onChange={() => toggle("sms")}
            />
          </label>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <FaWhatsapp className="mb-4 text-4xl text-green-500" />
          <h2 className="text-xl font-bold">WhatsApp Alerts</h2>

          <label className="mt-6 flex items-center justify-between">
            <span>Enable</span>
            <input
              type="checkbox"
              checked={prefs.whatsapp}
              onChange={() => toggle("whatsapp")}
            />
          </label>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Save Preferences
        </button>

        {saved && (
          <span className="flex items-center gap-2 text-sm font-medium text-emerald-600">
            <FaCheckCircle /> Preferences saved
          </span>
        )}
      </div>

      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-bold">Recent Alerts</h2>

        <div className="space-y-4">
          {recentAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`border-l-4 pl-4 ${
                alert.level === "high" ? "border-red-500" : "border-yellow-500"
              }`}
            >
              <FaBell className="mr-2 inline" />
              {alert.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
