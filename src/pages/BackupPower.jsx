import { FaBatteryHalf, FaGasPump, FaBolt } from "react-icons/fa";

const BackupPower = () => {
  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold">
        Backup Power Management
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <FaBatteryHalf className="text-4xl text-blue-600"/>
          <h2 className="mt-3 font-bold">Battery Backup</h2>
          <p className="text-3xl mt-4 font-bold">4.5 hrs</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <FaGasPump className="text-4xl text-green-600"/>
          <h2 className="mt-3 font-bold">Fuel Level</h2>
          <p className="text-3xl mt-4 font-bold">68%</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <FaBolt className="text-4xl text-yellow-500"/>
          <h2 className="mt-3 font-bold">Generator</h2>
          <p className="text-3xl mt-4 font-bold text-green-600">
            Running
          </p>
        </div>

      </div>

    </div>
  );
};

export default BackupPower;