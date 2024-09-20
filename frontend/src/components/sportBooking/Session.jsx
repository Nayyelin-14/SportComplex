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
    <div>
      {session_time.map((time, index) => (
        <div
          key={index}
          className="p-3 cursor-pointer"
          onClick={() => setSession(time)}
        >
          <p className=" bg-gray-700 p-2 text-white font-semibold">{time}</p>
        </div>
      ))}
    </div>
  );
};

export default Session;
