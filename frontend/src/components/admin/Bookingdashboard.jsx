import React, { useState } from "react";
import moment from "moment";
import { Pagination } from "antd";
const Bookingdashboard = ({ allbookings }) => {
  console.log(allbookings.length);
  // State to manage the current page and the number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of bookings per page

  // Calculate the index of the first and last booking for the current page
  const indexOfLastBooking = currentPage * itemsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - itemsPerPage;

  // Slice the data to show only the current page's bookings
  const currentBookings = allbookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
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
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {allbookings && (
              <>
                {currentBookings.map((booking) => (
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

                    <td className="px-6 py-4 text-center">
                      {moment(booking.createdAt).format("L")}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {booking.studentid}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="font-bold border-2 p-2  rounded-lg border-red-300 transition-all duration-300 ease-in-out hover:bg-red-500 hover:text-white hover:border-red-500 ">
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
      <Pagination
        defaultCurrent={1}
        current={currentPage} // Set current page
        total={allbookings.length} // Total number of items
        pageSize={itemsPerPage} // Items per page
        onChange={handlePageChange} // Handle page change
        className="float-right mt-10"
      />
    </div>
  );
};

export default Bookingdashboard;
