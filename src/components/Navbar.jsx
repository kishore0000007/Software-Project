import { FaBell, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="bg-white shadow px-8 py-4 flex justify-between items-center">

      <div>

        <h2 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h2>

        <p className="text-gray-500">
          AI Load Shedding Prediction System
        </p>

      </div>

      <div className="flex items-center gap-6">

        <button className="relative text-2xl">

          <FaBell />

          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>

        </button>

        <div className="flex items-center gap-3">

          <FaUserCircle className="text-4xl text-slate-700" />

          <div>

            <h4 className="font-semibold">
              ABC Company
            </h4>

            <p className="text-sm text-gray-500">
              Manager
            </p>

          </div>

        </div>

      </div>

    </header>
  );
};

export default Navbar;