import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTime, setSportType } from "../../store/bookingSlice";
import { getdiff_Bookings } from "../../apiEndpoints/booking";
import { message } from "antd";

const Session = ({ session_time, sportType, infos, fetchBookings }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  // Use state to track the index of the session whose view is currently open
  const [viewIndex, setViewIndex] = useState(null);

  const viewHandler = (index) => {
    // Toggle the view of the specific session by its index
    if (viewIndex === index) {
      setViewIndex(null); // Close if it's already open
    } else {
      setViewIndex(index); // Open the clicked one
    }
  };

  const setSession = (time) => {
    if (user.role === "Admin") {
      navigate("/booking");
    } else {
      dispatch(setSelectedTime(time));
      dispatch(setSportType(sportType));
      navigate("/bookingform");
    }
  };

  useEffect(() => {
    if (sportType) {
      fetchBookings(sportType);
    }
  }, [sportType]);

  return (
    <div className="flex flex-col gap-3 mt-0">
      <div className="container pb-8 sm:pb-5 flex flex-col sm:flex-row items-center sm:items-start justify-between">
        <div className="sm:w-1/2">
          <h1 className="text-3xl font-bold">{sportType}</h1>
          <p className="text-primary font-bold">Booking</p>
        </div>
        <div className="sm:w-1/2 flex justify-center sm:justify-end">
        </div>
      </div>

      {session_time.map((time, index) => (
        <div
          key={index}
          className="container p-3 w-11/12 rounded-lg bg-stone-200"
        >
          <div className="flex items-center justify-between">
            <span className="text-black text-base py-2 px-5 font-semibold">{time}</span>
            {user.role !== "Admin" && (
              <button
                className="text-sm sm:text-base py-2 px-4 bg-secondary rounded-2xl cursor-pointer text-white w-30 hover:bg-white hover:border-1 border-primary hover:text-primary"
                onClick={() => setSession(time)}
              >
                Book Now
              </button>
            )}
            <button
              className="text-sm cursor-pointer hover:border-b-2 hover:border-primary px-2"
              onClick={() => viewHandler(index)} // Pass the index of the session
            >
              View Bookings
            </button>
          </div>
          <hr className="my-3 border-gray-500" />

          {/* Display the bookings only for the session whose index matches viewIndex */}
          {viewIndex === index && (
            <div className="flex justify-center items-center">
              {infos[time] && infos[time].length > 0 ? (
                infos[time].map((booking, i) => (
                  <div key={i} className="py-2">
                    <p className="font-semibold text-sm sm:text-base">
                      {booking.name}
                    </p>
                  </div>
                ))
              ) : (
                <p>No bookings for this time</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Session;
