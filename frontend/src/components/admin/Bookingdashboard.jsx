import React, { useState, useEffect } from "react";
import moment from "moment";
import { message, Pagination } from "antd";
import { delete_booking } from "../../apiEndpoints/admin";
import { redirect } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/outline";
import ClipLoader from "react-spinners/ClipLoader";

const Bookingdashboard = ({ allbookings, isDataLoading, fetchallbookings }) => {
  // State to manage loading and page
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastBooking = currentPage * itemsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - itemsPerPage;
  const currentBookings = allbookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  const removeBooking = async (booking_id) => {
    const confirmation = window.confirm("Are you sure to delete this booking?");
    if (confirmation) {
      try {
        setIsLoading(true);
        const response = await delete_booking(booking_id);

        if (response.isSuccess) {
          message.success(response.message);
        }
      } catch (error) {
        message.error(error.message);
      } finally {
        setIsLoading(false);
        await fetchallbookings();
      }
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {/* Show initial loading spinner if data is still loading */}
      {isDataLoading ? (
        <div className="flex justify-center items-center h-[648px]">
          <ClipLoader size={100} />
        </div>
      ) : (
        <div>
          {/* Show loader if delete operation is in progress */}
          {isLoading ? (
            <div className="flex justify-center items-center h-[648px]">
              <ClipLoader size={100} />
            </div>
          ) : (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-[648px]">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
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
                {allbookings && allbookings.length > 0 ? (
                  <tbody>
                    {currentBookings.map((booking) => (
                      <tr
                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b"
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
                          <button
                            className=" text-red-800 p-1 hover:text-black"
                            onClick={() => removeBooking(booking._id)}
                          >
                            <TrashIcon width={20} height={20} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center py-4 text-md text-red-500"
                      >
                        No bookings found!
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          )}

          <Pagination
            defaultCurrent={1}
            current={currentPage}
            total={allbookings.length}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
            className="float-right mt-10"
          />
        </div>
      )}
    </div>
  );
};

export default Bookingdashboard;
