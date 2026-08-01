import { useState } from "react";
import { FaSearch, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { companies } from "../data/adminData";

const Companies = () => {
  const [search, setSearch] = useState("");

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Companies
          </h1>

          <p className="text-gray-500">
            Manage all registered companies.
          </p>
        </div>

      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow p-5">

        <div className="relative">

          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="text-left p-4">Company</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Plan</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Revenue</th>
              <th className="text-center p-4">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredCompanies.map((company) => (

              <tr
                key={company.id}
                className="border-b hover:bg-slate-50"
              >

                <td className="p-4 font-medium">
                  {company.name}
                </td>

                <td>{company.email}</td>

                <td>{company.plan}</td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                    ${
                      company.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : company.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {company.status}
                  </span>

                </td>

                <td>{company.revenue}</td>

                <td>

                  <div className="flex justify-center gap-3">

                    <button className="text-blue-600 hover:text-blue-800">
                      <FaEye />
                    </button>

                    <button className="text-green-600 hover:text-green-800">
                      <FaEdit />
                    </button>

                    <button className="text-red-600 hover:text-red-800">
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