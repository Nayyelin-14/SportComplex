import React from "react";
import moment from "moment";
const Bookingdashboard = ({ allbookings }) => {
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
                Sport Type
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Phone number
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Session
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Created at
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                StudentID
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {allbookings && (
              <>
                {allbookings.map((booking) => (
                  <tr
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b "
                    key={booking._id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                    >
                      {booking.name}
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                    >
                      {booking.sporttype}
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                    >
                      {booking.phone}
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                    >
                      {booking.session}
                    </th>
                    {/* <td className="px-6 py-4 text-center">{user.email}</td>
                    {user.role === "Admin" && (
                      <td className="px-6 py-4 text-center">
                        <span className="bg-blue-600 text-white font-medium p-2 rounded-lg">
                          {booking.role}
                        </span>
                      </td>
                    )} */}
                    {/* {user.role === "Student" && (
                      <td className="px-6 py-4 text-center">
                        <span className="bg-green-600 text-white font-medium p-2 rounded-lg">
                          {user.role}
                        </span>
                      </td>
                    )} */}

                    <td className="px-6 py-4 text-center">
                      {moment(booking.createdAt).format("L")}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {booking.studentid}
                    </td>
                    <td className="px-6 py-4 text-center">{booking.status}</td>
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

export default Bookingdashboard;
