import { FaEnvelope, FaSms, FaWhatsapp, FaBell } from "react-icons/fa";

const Notifications = () => {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">Notifications</h1>
        <p className="text-gray-500">
          Manage your alert preferences.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <FaEnvelope className="text-4xl text-blue-600 mb-4"/>
          <h2 className="font-bold text-xl">Email Alerts</h2>

          <label className="flex justify-between mt-6">
            <span>Enable</span>
            <input type="checkbox" defaultChecked />
          </label>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <FaSms className="text-4xl text-green-600 mb-4"/>
          <h2 className="font-bold text-xl">SMS Alerts</h2>

          <label className="flex justify-between mt-6">
            <span>Enable</span>
            <input type="checkbox"/>
          </label>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <FaWhatsapp className="text-4xl text-green-500 mb-4"/>
          <h2 className="font-bold text-xl">WhatsApp Alerts</h2>

          <label className="flex justify-between mt-6">
            <span>Enable</span>
            <input type="checkbox"/>
          </label>
        </div>

      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-bold text-xl mb-4">
          Recent Alerts
        </h2>

        <div className="space-y-4">

          <div className="border-l-4 border-red-500 pl-4">
            <FaBell className="inline mr-2"/>
            Mirpur outage expected at 5 PM.
          </div>

          <div className="border-l-4 border-yellow-500 pl-4">
            <FaBell className="inline mr-2"/>
            High grid load detected.
          </div>

        </div>

      </div>

    </div>
  );
};

export default Notifications;