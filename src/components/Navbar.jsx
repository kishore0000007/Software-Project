 import { FaBars, FaBell, FaUserCircle } from "react-icons/fa";

const Navbar = ({ setIsOpen }) => {
  return (
    <header className="bg-white h-16 shadow flex justify-between items-center px-6">

      <div className="flex items-center gap-4">

        <button
          className="lg:hidden text-xl"
          onClick={() => setIsOpen(true)}
        >
          <FaBars />
        </button>

        <div>
          <h2 className="font-bold text-2xl">
            Dashboard
          </h2>

          <p className="text-gray-500 text-sm">
            Welcome Back
          </p>
        </div>

      </div>

      <div className="flex items-center gap-6">

        <button className="relative">

          <FaBell className="text-xl"/>

          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"/>

        </button>

        <div className="flex items-center gap-3">

          <FaUserCircle className="text-4xl text-slate-700"/>

          <div>

            <p className="font-semibold">
              ABC Company
            </p>

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