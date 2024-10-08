import React, { useState } from "react";
import { Card, Avatar, Button, Form, Input, Row, Col, message } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import complex from "./complex.jpg";
import { useSelector } from "react-redux";
import Editprofile from "./Editprofile";
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
        <div>
          {isEditing ? (
            <div>
              <Editprofile setIsEditing={setIsEditing} isEditing={isEditing} />
            </div>
          ) : (
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={onEdit}
              className="mt-4"
            >
              Edit Profile
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
