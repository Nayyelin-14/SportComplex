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

// const [form] = Form.useForm();

// const onEdit = () => {
//   setIsEditing(true);
//   form.setFieldsValue(user); // Set initial form values to current user data
// };
// const onFinish = (values) => {
//   setUser(values);
//   setIsEditing(false);
//   message.success("Profile updated successfully!");
// };
{
  /* <div className="md:max-w-5xl md:mx-auto items-center">
        <img
          src={complex}
          alt=""
          className="w-full object-cover h-[200px] md:h-[250px] rounded-3xl"
        />
      </div>
      <div className="flex gap-14 items-start md:max-w-5xl md:mx-auto md:flex md:items-start md:gap-24 justify-between px-2">
        <div className="flex sm:gap-20 gap-10">
          <div style={{ padding: "50px" }} className="relative">
            <Avatar
              size={100}
              icon={<UserOutlined />}
              src={user.profileImage || null}
              alt="Profile Picture"
              style={{ marginBottom: "20px" }}
              className="bg-gray-800 border-4 border-white rounded-full absolute left-[80px] transform -translate-x-1/2 md:bottom-[5px] bottom-[15px] sm:left-[100px]"
            />
          </div>
          <div>
            <h3 className=" text-lg mt-3 sm:text-2xl">
              {user.username}
            </h3>
            <p className="text-sm sm:text-base text-gray-400">{user.role}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center rounded-2xl bg-white shadow-xl">
        <div className="px-4 py-4">
          <h3 className="pt-8 text-base sm:text-lg font-semibold">
            User Information
          </h3>
          <ul className="px-4 py-4 text-sm sm:text-base">
            <li className="grid grid-cols-1 sm:grid-cols-2 py-3">
              <div className="font-semibold">Email:</div>
              <div>{user.email}</div>
            </li>
            <li className="grid grid-cols-1 sm:grid-cols-2 py-3">
              <div className="font-semibold">Student ID:</div>
              <div>{user.memberID}</div>
            </li>
            <li className="grid grid-cols-1 sm:grid-cols-2 py-3">
              <div className="font-semibold">Phone Number:</div>
              <div>{user.phnumber}</div>
            </li>
          </ul>
        </div>
        <div className="flex flex-col px-4 py-2 items-start gap-1 sm:flex sm:gap-2 sm:flex-col sm:items-start mt-2">
          <div>
            {isEditing ? (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg w-full max-w-2xl">
                  <Editprofile
                    setIsEditing={setIsEditing}
                    isEditing={isEditing}
                  />
                </div>
              </div>
            ) : (
              <Button
                icon={<EditOutlined />}
                onClick={onEdit}
                className=" bg-primary border px-6 p-4 text-white font-base sm:font-md"
              >
                Edit Profile
              </Button>
            )}
          </div>
          <div className="z-1">
            <Link to="/booking">
              <Button
                icon={<BookOutlined />}
                className=" hover:bg-white bg-blue-600 text-white font-base sm:font-md"
              >
                Place booking
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <Button onClick={() => fetchHistory(user._id)}>
          Show booking history
        </Button>
       
      </div> */
}
