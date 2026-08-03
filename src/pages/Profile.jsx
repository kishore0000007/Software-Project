import { useState } from "react";
import { FaCamera, FaCheckCircle } from "react-icons/fa";

const defaults = {
  company: "ABC Company",
  email: "company@email.com",
  phone: "+88017XXXXXXXX",
  address: "Dhaka, Bangladesh",
};

const Profile = () => {
  const stored = JSON.parse(localStorage.getItem("user") || "{}");

  const [profile, setProfile] = useState({
    company: stored.company || defaults.company,
    email: stored.email || defaults.email,
    phone: stored.phone || defaults.phone,
    address: stored.address || defaults.address,
  });

  const [avatar, setAvatar] = useState(
    stored.avatar ||
      `https://i.pravatar.cc/150?u=${encodeURIComponent(stored.company || defaults.company)}`
  );

  const [saved, setSaved] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...stored,
      ...profile,
      avatar,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Company Profile</h1>
        <p className="mt-1 text-gray-500">Manage your business account details.</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
      >
        {/* Portrait */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src={avatar}
              alt="Profile portrait"
              className="h-24 w-24 rounded-full border-4 border-slate-100 object-cover shadow"
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
            <p className="font-semibold text-slate-800">{profile.company}</p>
            <p className="text-sm text-slate-400">
              Click the camera icon to update your portrait.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Company Name
            </label>
            <input
              className="w-full rounded-lg border border-slate-300 p-3 outline-none transition focus:ring-2 focus:ring-blue-500"
              value={profile.company}
              onChange={handleChange("company")}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Company Email
            </label>
            <input
              type="email"
              className="w-full rounded-lg border border-slate-300 p-3 outline-none transition focus:ring-2 focus:ring-blue-500"
              value={profile.email}
              onChange={handleChange("email")}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Phone Number
            </label>
            <input
              className="w-full rounded-lg border border-slate-300 p-3 outline-none transition focus:ring-2 focus:ring-blue-500"
              value={profile.phone}
              onChange={handleChange("phone")}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Business Address
            </label>
            <input
              className="w-full rounded-lg border border-slate-300 p-3 outline-none transition focus:ring-2 focus:ring-blue-500"
              value={profile.address}
              onChange={handleChange("address")}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Update Profile
          </button>

          {saved && (
            <span className="flex items-center gap-2 text-sm font-medium text-emerald-600">
              <FaCheckCircle /> Profile updated successfully
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;
