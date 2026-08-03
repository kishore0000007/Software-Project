import {
  FaBolt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 text-xl font-bold text-white">
            <FaBolt className="text-amber-400" />
            PowerPredict
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            AI-powered load-shedding forecasts and backup-power monitoring for
            businesses across Dhaka.
          </p>

          <div className="mt-5 flex gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition hover:bg-blue-600 hover:text-white"
            >
              <FaFacebookF className="text-sm" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition hover:bg-blue-600 hover:text-white"
            >
              <FaTwitter className="text-sm" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition hover:bg-blue-600 hover:text-white"
            >
              <FaLinkedinIn className="text-sm" />
            </a>
          </div>
        </div>

        {/* Product */}
        <div>
          <h3 className="mb-4 font-semibold text-white">Product</h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href="/dashboard" className="transition hover:text-white">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/prediction" className="transition hover:text-white">
                AI Predictions
              </a>
            </li>
            <li>
              <a href="/backup" className="transition hover:text-white">
                Backup Power
              </a>
            </li>
            <li>
              <a href="/reports" className="transition hover:text-white">
                Reports & Analytics
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="mb-4 font-semibold text-white">Company</h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href="/profile" className="transition hover:text-white">
                Account
              </a>
            </li>
            <li>
              <a href="#" className="transition hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="transition hover:text-white">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="transition hover:text-white">
                Careers
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-4 font-semibold text-white">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2.5">
              <FaEnvelope className="text-blue-400" />
              support@powerpredict.com
            </li>
            <li className="flex items-center gap-2.5">
              <FaPhoneAlt className="text-blue-400" />
              +880 1700-000000
            </li>
            <li className="flex items-center gap-2.5">
              <FaMapMarkerAlt className="text-blue-400" />
              Dhaka, Bangladesh
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 px-6 py-4 text-center text-xs text-slate-500">
        © {year} PowerPredict. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
