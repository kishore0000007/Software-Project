import { FaBatteryHalf, FaGasPump, FaBolt } from "react-icons/fa";

const BackupPower = () => {
  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
        Backup Power Management
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white rounded-xl shadow p-6 dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800">
          <FaBatteryHalf className="text-4xl text-blue-600 dark:text-blue-400"/>
          <h2 className="mt-3 font-bold dark:text-slate-100">Battery Backup</h2>
          <p className="text-3xl mt-4 font-bold dark:text-slate-100">4.5 hrs</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800">
          <FaGasPump className="text-4xl text-green-600 dark:text-green-400"/>
          <h2 className="mt-3 font-bold dark:text-slate-100">Fuel Level</h2>
          <p className="text-3xl mt-4 font-bold dark:text-slate-100">68%</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800">
          <FaBolt className="text-4xl text-yellow-500"/>
          <h2 className="mt-3 font-bold dark:text-slate-100">Generator</h2>
          <p className="text-3xl mt-4 font-bold text-green-600 dark:text-green-400">
            Running
          </p>
        </div>

      </div>

    </div>
  );
};

export default BackupPower;
