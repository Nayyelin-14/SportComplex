import React from "react";
import moment from "moment";
import {
  delete_user,
  restrict_user,
  unrestrict_user,
} from "../../apiEndpoints/admin";
import { message } from "antd";
const UsersDashboard = ({ allusers, fetchAllusers }) => {
  ///
  const restrictHandler = async (userID) => {
    try {
      const response = await restrict_user(userID);
      if (response.isSuccess) {
        message.success(response.message);
      }
      fetchAllusers();
    } catch (error) {
      return message.error(error.message);
    }
  };
  const unrestrictHandler = async (userID) => {
    try {
      const response = await unrestrict_user(userID);
      if (response.isSuccess) {
        message.success(response.message);
      }
      fetchAllusers();
    } catch (error) {
      return message.error(error.message);
    }
  };
  const deleteHandler = async (userID) => {
    try {
      // Show the confirm box before making the delete request
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this user?"
      );

      // If the user clicks "Cancel", exit the function and do not proceed with the delete
      if (!isConfirmed) {
        return;
      }

      // If the user confirms, proceed with the delete request
      const response = await delete_user(userID);

      if (response.isSuccess) {
        message.success(response.message);
        fetchAllusers(); // Refresh the user list after successful deletion
      }
    } catch (error) {
      message.error(error.message); // Show an error message if something goes wrong
    }
  };

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
                        <span className="text-blue-600 font-bold p-2 rounded-lg">
                          {user.role}
                        </span>
                      </td>
                    )}
                    {["Student", "Staff", "Lecturer", "Outsider"].includes(
                      user.role
                    ) && (
                      <td className="px-6 py-4 text-center">
                        <span className="text-green-600 font-bold p-2 rounded-lg">
                          {user.role}
                        </span>
                      </td>
                    )}
                    <td className="px-6 py-4 text-center">{user.status}</td>
                    <td className="px-6 py-4 text-center">
                      {moment(user.createdAt).format("L")}
                    </td>
                    <td
                      className={`${
                        user.role === "Admin" && `float-right`
                      } px-6 py-4 text-center flex items-center justify-between `}
                    >
                      {user.status === "active" ? (
                        <>
                          {[
                            "Student",
                            "Lecturer",
                            "Outsider",
                            "Staff",
                          ].includes(user.role) && (
                            <button
                              type="button"
                              className="font-sm  text-sm text-white bg-orange-600 p-1 px-4  hover:bg-orange-400 hover:text-black "
                              onClick={() => restrictHandler(user._id)}
                            >
                              Restrict
                            </button>
                          )}
                        </>
                      ) : (
                        <button
                          type="button"
                          className="font-sm  text-sm text-white bg-green-600 p-1 px-2 hover:bg-green-400 hover:text-black"
                          onClick={() => unrestrictHandler(user._id)}
                        >
                          Unrestrict
                        </button>
                      )}

                      <button
                        className="font-sm  text-sm text-white bg-red-700 p-1 px-2 hover:bg-red-600 hover:text-black"
                        onClick={() => deleteHandler(user._id)}
                      >
                        Delete
                      </button>
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
