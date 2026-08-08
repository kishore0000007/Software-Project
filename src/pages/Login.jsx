import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";
import authApi from "../services/api";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await authApi.login({ email, password });

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("token", data.token);
      // Normalize companyName -> company so the rest of the UI (Navbar,
      // Profile, Sidebar) doesn't need to change field names.
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, company: data.user.companyName })
      );

      navigate(data.user.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 dark:bg-slate-950">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
            P
          </div>

          <h1 className="text-3xl font-bold text-slate-800 mt-4 dark:text-slate-100">
            PowerPredict
          </h1>

          <p className="text-slate-500 mt-2 dark:text-slate-400">
            Business Login
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 dark:bg-red-500/10 dark:border-red-900/50 dark:text-red-400">
              {error}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-slate-300">
              Company Email
            </label>

            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="company@email.com"
                className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-slate-300">
              Password
            </label>

            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between text-sm">

            <label className="flex items-center gap-2 dark:text-slate-300">
              <input type="checkbox" />
              Remember Me
            </label>

            <button
              type="button"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </button>

          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg font-semibold transition duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Register */}
        <p className="text-center mt-6 text-sm text-gray-600 dark:text-slate-400">
          Don't have an account?

          <Link
            to="/register"
            className="ml-1 font-semibold text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
