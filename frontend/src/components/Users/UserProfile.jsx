import React, { useEffect, useState } from "react";
import { Card, Avatar, Button, Form, Input, Row, Col, message } from "antd";

import { EnvelopeIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import usericon from "./images/usericon.jpg";
import { useDispatch, useSelector } from "react-redux";

import { getBookingHistory } from "../../apiEndpoints/auth";

import UserSettingIndex from "./UserSettingIndex";
import { setUser } from "../../store/userSlice";

const UserProfile = () => {
  const [bookingshistory, setBookingshistory] = useState([]);

  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const fetchHistory = async (userID) => {
    try {
      const response = await getBookingHistory(userID);
      if (response.isSuccess) {
        setBookingshistory(response.booking_history);
        dispatch(setUser(response.currentUser_doc));
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };
  <UserCircleIcon />;
  useEffect(() => {
    if (user && user._id) {
      fetchHistory(user._id);
    }
  }, []);
  // console.log(bookingshistory);
  return (
    <div className="max-w-6xl mx-auto p-10">
      <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between w-full lg:w-[90%] gap-4 lg:gap-32 mx-auto">
        {/* Left Side: Image, Username, and Email */}
        <div className="flex flex-col lg:flex-row items-center lg:items-end gap-4 lg:w-[70%]">
          {user.profileImage && user.profileImage.length > 0 ? (
            <img
              src={user?.profileImage[user.profileImage.length - 1]}
              alt=""
              className="w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px] rounded-full border-4 border-red-900 p-1"
            />
          ) : (
            <img
              src={usericon}
              alt=""
              className="w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px] rounded-full border-4 border-red-900 p-1"
            />
          )}
          <div className="lg:mt-4 flex flex-col items-center lg:items-start">
            <h4 className="text-md md:text-[20px] font-bold sm:mb-3">
              {user.username}
            </h4>
            <p className="flex items-center text-sm md:text-lg text-gray-400 font-bold">
              <EnvelopeIcon className="h-5 w-5 md:h-7 md:w-7 font-bold mr-2" />
              {user.email}
            </p>
          </div>
        </div>

        {/* Right Side: Recent Bookings */}
        <div
          className="bg-red-900 text-white w-[100%] h-[54px] 
        sm:w-[60%] md:w-[60%] lg:w-[10%] lg:h-[110px] flex items-center justify-center mt-4 sm:mt-0 sm:ml-4 lg:ml-10 rounded-xl"
        >
          <div className="flex flex-col items-center justify-center font-bold">
            <p className=" mb-1 sm:text-lg md:text-2xl text-white">
              {bookingshistory.length}
            </p>
            <p className="text-center  text-[11px] md:text-[14px] text-white">
              Recent bookings
            </p>
          </div>
        </div>
      </div>

      <h1 className="mt-6 text-[14px] sm:my-10 md:text-[20px] font-bold md:p-2 lg:text-xl  text-black rounded-md">
        Account Setting
      </h1>
      <div className="">
        <UserSettingIndex bookingshistory={bookingshistory} />
      </div>
    </div>
  );
};

export default UserProfile;
