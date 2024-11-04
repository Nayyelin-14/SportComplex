import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
import complex from "./complex.jpg";

const BookingHistory = ({ bookingshistory }) => {
  //   console.log(bookingshistory);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
      {bookingshistory &&
        bookingshistory.length > 0 &&
        bookingshistory.map((booking) => {
          return (
            <div className="w-[100%] sm:w-[80%] lg:w-[100%] h-[130px] bg-gray-200 flex items-center px-4 mb-4 gap-4">
              <img
                src={complex}
                alt=""
                className="w-[45%] h-[80%] sm:w-[42%] mr-4"
              />

              <div className="flex flex-col h-full gap-4">
                <h1 className="font-bold mt-2">{booking.sporttype}</h1>
                <p>{booking.session}</p>
                <p>{booking.createdAt}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default BookingHistory;
