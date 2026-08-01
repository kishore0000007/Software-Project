import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend integration later
    console.log("Login Submitted");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-blue-600 mx-auto flex items-center justify-center text-white text-2xl font-bold">
            P
          </div>

          <h1 className="text-3xl font-bold mt-4 text-slate-800">
            PowerPredict
          </h1>

          <p className="text-slate-500 mt-2">
            Business Login
          </p>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}

          <div>
            <label className="block text-sm font-medium mb-2">
              Company Email
            </label>

            <div className="relative">

              <FiMail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                placeholder="company@email.com"
                className="w-full border rounded-lg py-3 pl-10 pr-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>
          </div>

          {/* Password */}

          <div>

            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <div className="relative">

              <FiLock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="w-full border rounded-lg py-3 pl-10 pr-12 focus:ring-2 focus:ring-blue-500 outline-none"
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

          {/* Remember */}

          <div className="flex justify-between items-center text-sm">

            <label className="flex items-center gap-2">

              <input type="checkbox" />

              Remember Me

            </label>

            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>

          </div>

          {/* Login Button */}

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Login
          </button>

        </form>

        {/* Register */}

        <p className="text-center mt-6 text-sm">

          Don't have an account?

          <Link
            to="/register"
            className="text-blue-600 font-semibold ml-1 hover:underline"
          >
            Register
          </Link>

        </p>

      </div>
    </div>
  );
};

export default Login;