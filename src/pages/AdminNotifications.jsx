import { useState } from "react";
import {
  FaEnvelope,
  FaSms,
  FaWhatsapp,
  FaDiscord,
  FaBell,
  FaCheckCircle,
  FaPaperPlane,
} from "react-icons/fa";
import { alertsApi } from "../services/api";
import { adminAlerts } from "../data/adminData";
import { useLanguage } from "../context/LanguageContext";

const defaultPrefs = { email: true, sms: false, whatsapp: false, discord: false };

const AdminNotifications = () => {
  const { t } = useLanguage();

  const [prefs, setPrefs] = useState(() => {
    const saved = localStorage.getItem("adminNotificationPrefs");
    return saved ? JSON.parse(saved) : defaultPrefs;
  });

  const [saved, setSaved] = useState(false);

  const [whatsappStatus, setWhatsappStatus] = useState(null); // { type: "success" | "error", text }
  const [sendingWhatsapp, setSendingWhatsapp] = useState(false);

  const [discordStatus, setDiscordStatus] = useState(null);
  const [sendingDiscord, setSendingDiscord] = useState(false);

  const toggle = (key) => {
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem("adminNotificationPrefs", JSON.stringify(prefs));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleSendTestWhatsApp = async () => {
    setSendingWhatsapp(true);
    setWhatsappStatus(null);

    try {
      await alertsApi.sendWhatsAppTest();
      setWhatsappStatus({ type: "success", text: "Test alert sent to the admin WhatsApp." });
    } catch (err) {
      setWhatsappStatus({ type: "error", text: err.message });
    } finally {
      setSendingWhatsapp(false);
    }
  };

  const handleSendTestDiscord = async () => {
    setSendingDiscord(true);
    setDiscordStatus(null);

    try {
      await alertsApi.sendDiscordTest();
      setDiscordStatus({ type: "success", text: "Test alert sent to the Discord channel." });
    } catch (err) {
      setDiscordStatus({ type: "error", text: err.message });
    } finally {
      setSendingDiscord(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold dark:text-slate-100">{t("alertChannels")}</h1>
        <p className="text-gray-500 dark:text-slate-400">
          {t("alertChannelsDesc")}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl bg-white p-6 shadow dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800">
          <FaEnvelope className="mb-4 text-4xl text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-bold dark:text-slate-100">{t("emailAlerts")}</h2>

          <label className="mt-6 flex items-center justify-between dark:text-slate-300">
            <span>{t("enable")}</span>
            <input
              type="checkbox"
              checked={prefs.email}
              onChange={() => toggle("email")}
            />
          </label>
        </div>

        <div className="rounded-xl bg-white p-6 shadow dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800">
          <FaSms className="mb-4 text-4xl text-green-600" />
          <h2 className="text-xl font-bold dark:text-slate-100">{t("smsAlerts")}</h2>

          <label className="mt-6 flex items-center justify-between dark:text-slate-300">
            <span>{t("enable")}</span>
            <input
              type="checkbox"
              checked={prefs.sms}
              onChange={() => toggle("sms")}
            />
          </label>
        </div>

        <div className="rounded-xl bg-white p-6 shadow dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800">
          <FaWhatsapp className="mb-4 text-4xl text-green-500" />
          <h2 className="text-xl font-bold dark:text-slate-100">{t("whatsappAlerts")}</h2>

          <label className="mt-6 flex items-center justify-between dark:text-slate-300">
            <span>{t("enable")}</span>
            <input
              type="checkbox"
              checked={prefs.whatsapp}
              onChange={() => toggle("whatsapp")}
            />
          </label>

          <button
            onClick={handleSendTestWhatsApp}
            disabled={sendingWhatsapp}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-600 disabled:bg-green-300"
          >
            <FaPaperPlane className="text-xs" />
            {sendingWhatsapp ? "Sending..." : "Send Test WhatsApp Alert"}
          </button>

          {whatsappStatus && (
            <p
              className={`mt-3 text-xs ${
                whatsappStatus.type === "success" ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {whatsappStatus.text}
            </p>
          )}
        </div>

        <div className="rounded-xl bg-white p-6 shadow dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800">
          <FaDiscord className="mb-4 text-4xl text-indigo-500" />
          <h2 className="text-xl font-bold dark:text-slate-100">{t("discordAlerts")}</h2>

          <label className="mt-6 flex items-center justify-between dark:text-slate-300">
            <span>{t("enable")}</span>
            <input
              type="checkbox"
              checked={prefs.discord}
              onChange={() => toggle("discord")}
            />
          </label>

          <button
            onClick={handleSendTestDiscord}
            disabled={sendingDiscord}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-600 disabled:bg-indigo-300"
          >
            <FaPaperPlane className="text-xs" />
            {sendingDiscord ? "Sending..." : "Send Test Discord Alert"}
          </button>

          {discordStatus && (
            <p
              className={`mt-3 text-xs ${
                discordStatus.type === "success" ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {discordStatus.text}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          {t("saveChannelSettings")}
        </button>

        {saved && (
          <span className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
            <FaCheckCircle /> {t("settingsSaved")}
          </span>
        )}
      </div>

      <div className="rounded-xl bg-white p-6 shadow dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800">
        <h2 className="mb-4 text-xl font-bold dark:text-slate-100">{t("recentAlertsSent")}</h2>

        <div className="space-y-4">
          {adminAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`border-l-4 pl-4 dark:text-slate-300 ${
                alert.level === "high"
                  ? "border-red-500"
                  : alert.level === "medium"
                  ? "border-yellow-500"
                  : "border-emerald-500"
              }`}
            >
              <FaBell className="mr-2 inline" />
              {alert.message}
              <span className="ml-2 text-xs text-slate-400">{alert.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminNotifications;
