import { useEffect, useState } from "react";
import { FaCamera, FaCheckCircle } from "react-icons/fa";
import authApi from "../services/api";

const Profile = () => {
  const stored = JSON.parse(localStorage.getItem("user") || "{}");

  const [profile, setProfile] = useState({
    company: stored.company || "",
    email: stored.email || "",
    phone: stored.phone || "",
    address: stored.address || "",
  });

  const [avatar, setAvatar] = useState(
    stored.avatar || `https://i.pravatar.cc/150?u=${encodeURIComponent(stored.company || "business")}`
  );

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Load the latest profile from the backend on mount, in case it was
  // updated elsewhere (or localStorage is stale).
  useEffect(() => {
    authApi
      .getProfile()
      .then(({ user }) => {
        setProfile({
          company: user.companyName || "",
          email: user.email || "",
          phone: user.phone || "",
          address: user.address || "",
        });
        if (user.avatar) setAvatar(user.avatar);

        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, company: user.companyName })
        );
      })
      .catch(() => {
        // Fall back silently to whatever was already in localStorage.
      });
  }, []);

  const handleChange = (field) => (e) => {
    setProfile((p) => ({ ...p, [field]: e.target.value }));
    setSaved(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
    setSaved(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { user } = await authApi.updateProfile({
        companyName: profile.company,
        email: profile.email,
        phone: profile.phone,
        address: profile.address,
        avatar,
      });

      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, company: user.companyName })
      );

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Company Profile</h1>
        <p className="mt-1 text-gray-500 dark:text-slate-400">Manage your business account details.</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:shadow-none"
      >
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-500/10 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Portrait */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src={avatar}
              alt="Profile portrait"
              className="h-24 w-24 rounded-full border-4 border-slate-100 object-cover shadow dark:border-slate-700"
            />
            <label className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-blue-600 p-2 text-white shadow transition hover:bg-blue-700">
              <FaCamera className="text-sm" />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
          </div>

          <div>
            <p className="font-semibold text-slate-800 dark:text-slate-100">{profile.company}</p>
            <p className="text-sm text-slate-400 dark:text-slate-500">
              Click the camera icon to update your portrait.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
              Company Name
            </label>
            <input
              className="w-full rounded-lg border border-slate-300 p-3 outline-none transition focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              value={profile.company}
              onChange={handleChange("company")}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
              Company Email
            </label>
            <input
              type="email"
              className="w-full rounded-lg border border-slate-300 p-3 outline-none transition focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              value={profile.email}
              onChange={handleChange("email")}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
              Phone Number
            </label>
            <input
              className="w-full rounded-lg border border-slate-300 p-3 outline-none transition focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              value={profile.phone}
              onChange={handleChange("phone")}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
              Business Address
            </label>
            <input
              className="w-full rounded-lg border border-slate-300 p-3 outline-none transition focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              value={profile.address}
              onChange={handleChange("address")}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:bg-blue-400"
          >
            {loading ? "Saving..." : "Update Profile"}
          </button>

          {saved && (
            <span className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
              <FaCheckCircle /> Profile updated successfully
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;
