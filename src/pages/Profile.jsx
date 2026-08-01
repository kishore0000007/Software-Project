const Profile = () => {
  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold">
        Company Profile
      </h1>

      <div className="bg-white rounded-xl shadow p-8">

        <div className="grid md:grid-cols-2 gap-6">

          <input
            className="border p-3 rounded-lg"
            defaultValue="ABC Company"
          />

          <input
            className="border p-3 rounded-lg"
            defaultValue="company@email.com"
          />

          <input
            className="border p-3 rounded-lg"
            defaultValue="+88017XXXXXXXX"
          />

          <input
            className="border p-3 rounded-lg"
            defaultValue="Dhaka, Bangladesh"
          />

        </div>

        <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg">
          Update Profile
        </button>

      </div>

    </div>
  );
};

export default Profile;