import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBolt, FaBars, FaTimes } from "react-icons/fa";

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition ${
    isActive
      ? "text-blue-600 dark:text-blue-400"
      : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
  }`;

const PublicNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-slate-100">
          <FaBolt className="text-amber-500" />
          PowerPredict
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>

        <button
          className="text-xl text-slate-700 md:hidden dark:text-slate-300"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-6 py-4 md:hidden dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-4">
            <NavLink to="/" end className={navLinkClass} onClick={() => setMobileOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/about" className={navLinkClass} onClick={() => setMobileOpen(false)}>
              About
            </NavLink>
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg border px-4 py-2 text-center text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicNavbar;
