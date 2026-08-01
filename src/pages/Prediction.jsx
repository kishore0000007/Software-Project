import { useState } from "react";
import { FaRobot, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const Prediction = () => {
  const [prediction, setPrediction] = useState(null);

  const handlePredict = () => {
    // Dummy data (replace with API later)
    setPrediction({
      area: "Mirpur",
      status: "High Risk",
      duration: "2 Hours",
      confidence: "92%",
    });
  };

  const history = [
    {
      area: "Mirpur",
      date: "01 Aug",
      prediction: "High Risk",
    },
    {
      area: "Uttara",
      date: "31 Jul",
      prediction: "Low Risk",
    },
    {
      area: "Dhanmondi",
      date: "30 Jul",
      prediction: "Medium Risk",
    },
  ];

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          AI Load Shedding Prediction
        </h1>

        <p className="text-gray-500 mt-2">
          Predict possible power outages for your business area.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="block font-semibold mb-2">
              Select Area
            </label>

            <select className="w-full border rounded-lg p-3">
              <option>Mirpur</option>
              <option>Dhanmondi</option>
              <option>Uttara</option>
              <option>Mohammadpur</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handlePredict}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
            >
              <FaRobot />
              Predict Now
            </button>
          </div>

        </div>

      </div>

      {prediction && (
        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-bold mb-5">
            Prediction Result
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

            <div className="bg-blue-100 p-5 rounded-lg">
              <FaMapMarkerAlt className="text-blue-600 text-2xl mb-2" />
              <p className="text-gray-500">Area</p>
              <h3 className="font-bold">{prediction.area}</h3>
            </div>

            <div className="bg-red-100 p-5 rounded-lg">
              <FaRobot className="text-red-600 text-2xl mb-2" />
              <p className="text-gray-500">Risk</p>
              <h3 className="font-bold">{prediction.status}</h3>
            </div>

            <div className="bg-yellow-100 p-5 rounded-lg">
              <FaClock className="text-yellow-600 text-2xl mb-2" />
              <p className="text-gray-500">Duration</p>
              <h3 className="font-bold">{prediction.duration}</h3>
            </div>

            <div className="bg-green-100 p-5 rounded-lg">
              <p className="text-gray-500">Confidence</p>
              <h3 className="text-3xl font-bold text-green-600">
                {prediction.confidence}
              </h3>
            </div>

          </div>

        </div>
      )}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold mb-5">
          Prediction History
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">Date</th>
              <th className="text-left py-3">Area</th>
              <th className="text-left py-3">Prediction</th>

            </tr>

          </thead>

          <tbody>

            {history.map((item, index) => (
              <tr key={index} className="border-b hover:bg-slate-50">

                <td className="py-4">{item.date}</td>

                <td>{item.area}</td>

                <td>{item.prediction}</td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Prediction;