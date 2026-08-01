import { FaBell, FaUserShield } from "react-icons/fa";

const AdminNavbar = () => {
  return (
    <header className="h-16 bg-white shadow flex justify-between items-center px-6">

      <div>
        <h2 className="text-2xl font-bold">
          Admin Dashboard
        </h2>

        <p className="text-gray-500 text-sm">
          System Overview
        </p>
      </div>

      <div className="flex items-center gap-5">

        <button className="relative">
          <FaBell className="text-xl" />

          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center gap-3">

          <FaUserShield className="text-4xl text-slate-700" />

          <div>
            <p className="font-semibold">
              System Admin
            </p>

            <p className="text-sm text-gray-500">
              Administrator
            </p>
          </div>

        </div>

      </div>

    </header>
  );
};

export default AdminNavbar;