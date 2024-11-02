import React, { useEffect, useState } from "react";
import { Card, Avatar, Button, Form, Input, Row, Col, message } from "antd";

import { EnvelopeIcon } from "@heroicons/react/24/outline";
import complex from "./complex.jpg";
import { useSelector } from "react-redux";

import { getBookingHistory } from "../../apiEndpoints/auth";

import UserSettingIndex from "./UserSettingIndex";

const UserProfile = () => {
  const [bookingshistory, setBookingshistory] = useState([]);

  const { user } = useSelector((state) => state.user);
  console.log(user);

  const fetchHistory = async (userID) => {
    try {
      const response = await getBookingHistory(userID);
      if (response.isSuccess) {
        setBookingshistory(response.booking_history);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };
  console.log(bookingshistory);
  useEffect(() => {
    if (user && user._id) {
      fetchHistory(user._id);
    }
  }, [user]);
  // console.log(bookingshistory);
  return (
    <div className="max-w-6xl mx-auto p-10">
      <div>
        <div className="flex justify-between items-center">
          <div className="flex items-end gap-10">
            <img
              src={complex}
              alt=""
              className="w-[170px] h-[170px] rounded-xl"
            />
            <div>
              <h4 className="text-xl font-bold">{user.username}</h4>
              <p className="flex items-center text-lg font-bold">
                <EnvelopeIcon className="h-7 w-7 font-bold text-gray-500 mr-2 " />
                {user.email}
              </p>
            </div>
          </div>
          <div className="bg-red-900 w-[120px] h-[120px] flex items-center justify-center rounded-xl">
            <div className="flex flex-col gap-4 items-center justify-center text-white font-bold">
              <p className="text-5xl">{bookingshistory.length}</p>
              <h3>Bookings</h3>
            </div>
          </div>
        </div>
      </div>
      <h1 className=" my-10 text-3xl font-bold">Account Setting</h1>
      <div className=" ">
        <UserSettingIndex />
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
            <h3 className="font-semibold text-lg mt-3 sm:text-2xl">
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
        <div>
          {prevBookings ? (
            <div>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-center">
                      Sport Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Booked date
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Session
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {prevBookings.map((prev_booking) => (
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b ">
                      <td className="px-6 py-4 text-center">
                        {prev_booking.sporttype}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {prev_booking.createdAt}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {prev_booking.session}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>Hi there</div>
          )}
        </div>
      </div> */
}
