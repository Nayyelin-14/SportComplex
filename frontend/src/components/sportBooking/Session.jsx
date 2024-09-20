import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setSelectedTime } from "../../store/bookingSlice";
import { setSportType } from "../../store/bookingSlice";
// import { setSportType } from "../../store/typeSlice";

const Session = ({ session_time, sportType, bookings }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const setSession = (time) => {
    dispatch(setSelectedTime(time));
    dispatch(setSportType(sportType));
    navigate("/bookingform");
  };
  if (bookings && Array.isArray(bookings) && bookings.length > 0) {
    bookings.map((booking) => {
      return booking.map((book) => {
        console.log(book.phone);
      });
    });
  } else {
    console.log("Bookings array is empty or undefined.");
  }
  return (
    <div className="flex gap-3 mt-6">
      {session_time.map((time, index) => (
        <div
          key={index}
          className="p-3 cursor-pointer"
          onClick={() => setSession(time)}
        >
          <div className="">
            <span className="text-black p-2  font-semibold  ">{time}</span>
            <div>
              {bookings && bookings.length !== 0 && (
                <div>
                  {bookings.map(
                    (booking) =>
                      booking.map((bookingInfo, index) => {
                        return (
                          <div key={index}>
                            <p>{bookingInfo.name}</p>
                          </div>
                        );
                      }) // You only need one map
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Session;
