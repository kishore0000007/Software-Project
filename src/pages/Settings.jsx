import { useState } from "react";
import {
  FaBuilding,
  FaBell,
  FaRobot,
  FaCreditCard,
  FaLock,
  FaSave,
} from "react-icons/fa";

const Settings = () => {
  const [settings, setSettings] = useState({
    companyName: "PowerPredict",
    supportEmail: "support@powerpredict.com",
    smsAlerts: true,
    emailAlerts: true,
    whatsappAlerts: false,
    predictionInterval: 30,
    businessPlan: 29.99,
    enterprisePlan: 99.99,
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

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          System Settings
        </h1>

        <p className="text-gray-500">
          Manage platform configuration and preferences.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Company Information */}
        <div className="bg-white rounded-xl shadow p-6">

          <div className="flex items-center gap-3 mb-6">
            <FaBuilding className="text-blue-600 text-xl" />
            <h2 className="text-xl font-semibold">
              Company Information
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block mb-2 font-medium">
                Platform Name
              </label>

              <input
                type="text"
                name="companyName"
                value={settings.companyName}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Support Email
              </label>

              <input
                type="email"
                name="supportEmail"
                value={settings.supportEmail}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

          </div>

        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl shadow p-6">

          <div className="flex items-center gap-3 mb-6">
            <FaBell className="text-yellow-500 text-xl" />
            <h2 className="text-xl font-semibold">
              Notification Settings
            </h2>
          </div>

          <div className="space-y-4">

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="smsAlerts"
                checked={settings.smsAlerts}
                onChange={handleChange}
              />
              SMS Alerts
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="emailAlerts"
                checked={settings.emailAlerts}
                onChange={handleChange}
              />
              Email Alerts
            </label>

            <label className="flex items-center gap-3">
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
        <div className="bg-white rounded-xl shadow p-6">

          <div className="flex items-center gap-3 mb-6">
            <FaRobot className="text-purple-600 text-xl" />
            <h2 className="text-xl font-semibold">
              AI Prediction
            </h2>
          </div>

          <label className="block mb-2 font-medium">
            Prediction Interval (Minutes)
          </label>

          <input
            type="number"
            name="predictionInterval"
            value={settings.predictionInterval}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

        </div>

        {/* Subscription */}
        <div className="bg-white rounded-xl shadow p-6">

          <div className="flex items-center gap-3 mb-6">
            <FaCreditCard className="text-green-600 text-xl" />
            <h2 className="text-xl font-semibold">
              Subscription Pricing
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block mb-2 font-medium">
                Business Plan ($)
              </label>

              <input
                type="number"
                name="businessPlan"
                value={settings.businessPlan}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Enterprise Plan ($)
              </label>

              <input
                type="number"
                name="enterprisePlan"
                value={settings.enterprisePlan}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

          </div>

        </div>

        {/* Security */}
        <div className="bg-white rounded-xl shadow p-6">

          <div className="flex items-center gap-3 mb-6">
            <FaLock className="text-red-600 text-xl" />
            <h2 className="text-xl font-semibold">
              Security
            </h2>
          </div>

          <button
            type="button"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
          >
            Change Admin Password
          </button>

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