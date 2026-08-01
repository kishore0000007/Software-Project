import { useState } from "react";
import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaCreditCard,
} from "react-icons/fa";

import { subscriptions } from "../data/adminData";

const Subscriptions = () => {
  const [search, setSearch] = useState("");

  const filteredPlans = subscriptions.filter((plan) =>
    plan.plan.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Subscription Management
        </h1>

        <p className="text-gray-500">
          Manage subscription plans and pricing.
        </p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow p-5">

        <div className="relative">

          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search subscription..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg py-3 pl-11 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"
          />

        </div>

      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {filteredPlans.map((plan) => (

          <div
            key={plan.id}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
          >

            <div className="flex justify-between items-center mb-5">

              <FaCreditCard className="text-3xl text-blue-600" />

              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  plan.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {plan.status}
              </span>

            </div>

            <h2 className="text-2xl font-bold">
              {plan.plan}
            </h2>

            <p className="text-4xl font-bold text-blue-600 mt-3">
              {plan.price}
            </p>

            <div className="mt-5 space-y-2">

              <p>
                <strong>Billing:</strong> {plan.billing}
              </p>

              <p>
                <strong>Subscribers:</strong> {plan.subscribers}
              </p>

            </div>

            <div className="flex justify-between mt-6">

              <button className="text-green-600 hover:text-green-800">
                <FaEdit />
              </button>

              <button className="text-red-600 hover:text-red-800">
                <FaTrash />
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Subscriptions;