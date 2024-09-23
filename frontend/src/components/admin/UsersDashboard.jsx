import React from "react";
import moment from "moment";
const UsersDashboard = ({ allusers }) => {
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Role
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Created at
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {allusers && (
              <>
                {allusers.map((user) => (
                  <tr
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b "
                    key={user._id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                    >
                      {user.username}
                    </th>
                    <td className="px-6 py-4 text-center">{user.email}</td>
                    {user.role === "Admin" && (
                      <td className="px-6 py-4 text-center">
                        <span className="bg-blue-600 text-white font-medium p-2 rounded-lg">
                          {user.role}
                        </span>
                      </td>
                    )}
                    {user.role === "Student" && (
                      <td className="px-6 py-4 text-center">
                        <span className="bg-green-600 text-white font-medium p-2 rounded-lg">
                          {user.role}
                        </span>
                      </td>
                    )}
                    <td className="px-6 py-4 text-center">{user.status}</td>
                    <td className="px-6 py-4 text-center">
                      {moment(user.createdAt).format("L")}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {user.status === "active" ? (
                        <button
                          type="button"
                          className="font-medium  text-base text-green-700 hover:underline hover:text-green-700 text-center"
                          onClick={() => ban_userHandler(user._id)}
                        >
                          Inactive
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="font-medium  text-base text-green-700 hover:underline hover:text-green-700 text-center"
                          onClick={() => unban_userHandler(user._id)}
                        >
                          Active
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersDashboard;
