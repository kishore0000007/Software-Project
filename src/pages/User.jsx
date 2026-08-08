import { useState } from "react";
import {
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import { users } from "../data/adminData";
import { useLanguage } from "../context/LanguageContext";

const Users = () => {
  const [search, setSearch] = useState("");
  const { t } = useLanguage();

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
          {t("userManagement")}
        </h1>

        <p className="text-gray-500 dark:text-slate-400">
          {t("manageUsersDesc")}
        </p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow p-5 dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800">

        <div className="relative">

          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder={t("searchUser")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
          />

        </div>

      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800">

        <table className="w-full">

          <thead className="bg-slate-100 dark:bg-slate-800">

            <tr>

              <th className="p-4 text-left dark:text-slate-200">{t("name")}</th>
              <th className="p-4 text-left dark:text-slate-200">{t("email")}</th>
              <th className="p-4 text-left dark:text-slate-200">{t("company")}</th>
              <th className="p-4 text-left dark:text-slate-200">{t("role")}</th>
              <th className="p-4 text-left dark:text-slate-200">{t("status")}</th>
              <th className="p-4 text-center dark:text-slate-200">{t("actions")}</th>

            </tr>

          </thead>

          <tbody>

            {filteredUsers.map((user) => (

              <tr
                key={user.id}
                className="border-b hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
              >

                <td className="p-4 font-medium dark:text-slate-100">
                  {user.name}
                </td>

                <td className="dark:text-slate-300">{user.email}</td>

                <td className="dark:text-slate-300">{user.company}</td>

                <td className="dark:text-slate-300">{user.role}</td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                    ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                        : user.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
                        : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                    }`}
                  >
                    {user.status}
                  </span>

                </td>

                <td>

                  <div className="flex justify-center gap-4">

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

export default Users;
