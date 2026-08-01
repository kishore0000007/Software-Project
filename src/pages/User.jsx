import { useState } from "react";
import {
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import { users } from "../data/adminData";

const Users = () => {
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          User Management
        </h1>

        <p className="text-gray-500">
          Manage all registered users.
        </p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow p-5">

        <div className="relative">

          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Company</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredUsers.map((user) => (

              <tr
                key={user.id}
                className="border-b hover:bg-slate-50"
              >

                <td className="p-4 font-medium">
                  {user.name}
                </td>

                <td>{user.email}</td>

                <td>{user.company}</td>

                <td>{user.role}</td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                    ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : user.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>

                </td>

                <td>

                  <div className="flex justify-center gap-4">

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

export default Users;