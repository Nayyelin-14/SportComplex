import React, { useState } from "react";
import { Card, Avatar, Button, Form, Input, Row, Col, message } from "antd";
import { EditOutlined, UserOutlined, BookOutlined } from "@ant-design/icons";
import complex from "./complex.jpg";
import { useSelector } from "react-redux";
import Editprofile from "./Editprofile";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  //   const [user, setUser] = useState({
  //     name: "John Doe",
  //     email: "johndoe@example.com",
  //     phone: "123-456-7890",
  //     address: "123 Main St, New York, NY",
  //     profileImage: "",
  //   });

  const { user } = useSelector((state) => state.user);
  console.log(user);
  const [form] = Form.useForm();

  const onEdit = () => {
    setIsEditing(true);
    form.setFieldsValue(user); // Set initial form values to current user data
  };

  const onFinish = (values) => {
    setUser(values);
    setIsEditing(false);
    message.success("Profile updated successfully!");
  };

  return (
    <div className="container py-10 md:max-w-5xl md:mx-auto">
      <div className="md:max-w-5xl md:mx-auto items-center">
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
            <h3 className="font-semibold text-lg mt-3 sm:text-2xl">{user.username}</h3>
            <p className="text-sm sm:text-base text-gray-400">{user.role}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center rounded-2xl bg-white shadow-xl">
          <div className="px-4 py-4">
            <h3 className="pt-8 text-base sm:text-lg font-semibold">User Information</h3>
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
    </div>
  );
};

export default UserProfile;
