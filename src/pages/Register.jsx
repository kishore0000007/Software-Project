import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import authApi from "../services/api";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    companyName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const data = await authApi.register({
        companyName: form.companyName,
        email: form.email,
        phone: form.phone,
        address: form.address,
        password: form.password,
      });

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, company: data.user.companyName })
      );

      // New accounts are always "business" accounts.
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center py-10 px-4 dark:bg-slate-950">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mx-auto text-white text-2xl font-bold">
            P
          </div>

          <h1 className="text-3xl font-bold mt-4 text-slate-800 dark:text-slate-100">
            PowerPredict
          </h1>

          <p className="text-slate-500 mt-2 dark:text-slate-400">
            Create a Business Account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 dark:bg-red-500/10 dark:border-red-900/50 dark:text-red-400">
              {error}
            </div>
          )}

          {/* Company Name */}
          <div>
            <label className="block mb-2 text-sm font-medium dark:text-slate-300">
              Company Name
            </label>

            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                required
                value={form.companyName}
                onChange={handleChange("companyName")}
                placeholder="ABC Company Ltd."
                className="w-full border rounded-lg py-3 pl-10 pr-3 focus:ring-2 focus:ring-blue-500 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium dark:text-slate-300">
              Company Email
            </label>

            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="email"
                required
                value={form.email}
                onChange={handleChange("email")}
                placeholder="company@email.com"
                className="w-full border rounded-lg py-3 pl-10 pr-3 focus:ring-2 focus:ring-blue-500 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 text-sm font-medium dark:text-slate-300">
              Phone Number
            </label>

            <div className="relative">
              <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="tel"
                value={form.phone}
                onChange={handleChange("phone")}
                placeholder="+8801XXXXXXXXX"
                className="w-full border rounded-lg py-3 pl-10 pr-3 focus:ring-2 focus:ring-blue-500 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block mb-2 text-sm font-medium dark:text-slate-300">
              Business Address
            </label>

            <div className="relative">
              <FiMapPin className="absolute left-3 top-4 text-gray-400" />

              <textarea
                rows="3"
                value={form.address}
                onChange={handleChange("address")}
                placeholder="Enter business address"
                className="w-full border rounded-lg py-3 pl-10 pr-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium dark:text-slate-300">
              Password
            </label>

            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={6}
                value={form.password}
                onChange={handleChange("password")}
                placeholder="Create Password"
                className="w-full border rounded-lg py-3 pl-10 pr-12 focus:ring-2 focus:ring-blue-500 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-2 text-sm font-medium dark:text-slate-300">
              Confirm Password
            </label>

            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type={showConfirm ? "text" : "password"}
                required
                value={form.confirmPassword}
                onChange={handleChange("confirmPassword")}
                placeholder="Confirm Password"
                className="w-full border rounded-lg py-3 pl-10 pr-12 focus:ring-2 focus:ring-blue-500 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirm ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-center gap-2 text-sm dark:text-slate-300">
            <input type="checkbox" required />
            <span>
              I agree to the Terms & Conditions
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm mt-6 dark:text-slate-400">
          Already have an account?
          <Link
            to="/login"
            className="text-blue-600 font-semibold ml-1 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
