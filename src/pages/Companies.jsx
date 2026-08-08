import { useState } from "react";
import { FaSearch, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { companies } from "../data/adminData";
import { useLanguage } from "../context/LanguageContext";

const Companies = () => {
  const [search, setSearch] = useState("");
  const { t } = useLanguage();

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            {t("companies")}
          </h1>

          <p className="text-gray-500 dark:text-slate-400">
            {t("manageCompaniesDesc")}
          </p>
        </div>

      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow p-5 dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800">

        <div className="relative">

          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder={t("searchCompany")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
          />

        </div>

      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800">

        <table className="w-full">

          <thead className="bg-slate-100 dark:bg-slate-800">

            <tr>

              <th className="text-left p-4 dark:text-slate-200">{t("company")}</th>
              <th className="text-left p-4 dark:text-slate-200">{t("email")}</th>
              <th className="text-left p-4 dark:text-slate-200">{t("plan")}</th>
              <th className="text-left p-4 dark:text-slate-200">{t("status")}</th>
              <th className="text-left p-4 dark:text-slate-200">{t("revenueCol")}</th>
              <th className="text-center p-4 dark:text-slate-200">{t("actions")}</th>

            </tr>

          </thead>

          <tbody>

            {filteredCompanies.map((company) => (

              <tr
                key={company.id}
                className="border-b hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
              >

                <td className="p-4 font-medium dark:text-slate-100">
                  {company.name}
                </td>

                <td className="dark:text-slate-300">{company.email}</td>

                <td className="dark:text-slate-300">{company.plan}</td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                    ${
                      company.status === "Active"
                        ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                        : company.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
                        : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                    }`}
                  >
                    {company.status}
                  </span>

                </td>

                <td className="dark:text-slate-300">{company.revenue}</td>

                <td>

                  <div className="flex justify-center gap-3">

                    <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                      <FaEye />
                    </button>

                    <button className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300">
                      <FaEdit />
                    </button>

                    <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                      <FaTrash />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Companies;
