import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setSelectedTime } from "../../store/bookingSlice";
import { setSportType } from "../../store/bookingSlice";
// import { setSportType } from "../../store/typeSlice";

const Session = ({ session_time, sportType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const setSession = (time) => {
    dispatch(setSelectedTime(time));
    dispatch(setSportType(sportType));
    navigate("/bookingform");
  };

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
            <div>Booking names twy</div>
            <div>Booking names twy</div>
            <div>Booking names twy</div>
            <div>Booking names twy</div>
            <div>Booking names twy</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Session;
