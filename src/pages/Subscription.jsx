import { useState } from "react";
import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaCreditCard,
} from "react-icons/fa";

import { subscriptions } from "../data/adminData";
import { useLanguage } from "../context/LanguageContext";

const Subscriptions = () => {
  const [search, setSearch] = useState("");
  const { t } = useLanguage();

  const filteredPlans = subscriptions.filter((plan) =>
    plan.plan.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
          {t("subscriptionManagement")}
        </h1>

        <p className="text-gray-500 dark:text-slate-400">
          {t("manageSubscriptionsDesc")}
        </p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow p-5 dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800">

        <div className="relative">

          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder={t("searchSubscription")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg py-3 pl-11 pr-4 focus:ring-2 focus:ring-blue-500 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
          />

        </div>

      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {filteredPlans.map((plan) => (

          <div
            key={plan.id}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition dark:bg-slate-900 dark:ring-1 dark:ring-slate-800 dark:hover:ring-slate-700"
          >

            <div className="flex justify-between items-center mb-5">

              <FaCreditCard className="text-3xl text-blue-600 dark:text-blue-400" />

              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  plan.status === "Active"
                    ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                    : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                }`}
              >
                {plan.status}
              </span>

            </div>

            <h2 className="text-2xl font-bold dark:text-slate-100">
              {plan.plan}
            </h2>

            <p className="text-4xl font-bold text-blue-600 mt-3 dark:text-blue-400">
              {plan.price}
            </p>

            <div className="mt-5 space-y-2 dark:text-slate-300">

              <p>
                <strong>{t("billing")}:</strong> {plan.billing === "Monthly" ? t("monthly") : plan.billing}
              </p>

              <p>
                <strong>{t("subscribers")}:</strong> {plan.subscribers}
              </p>

            </div>

            <div className="flex justify-between mt-6">

              <button className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300">
                <FaEdit />
              </button>

              <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
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
