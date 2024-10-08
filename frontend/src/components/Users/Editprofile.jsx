import React, { useEffect, useState } from "react";
import { Card, Avatar, Button, Form, Input, Select, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateInfo } from "../../apiEndpoints/auth";
import { setUser } from "../../store/userSlice";
import { WarningOutlined } from "@ant-design/icons";
import moment from "moment";
const Editprofile = ({ setIsEditing, isEditing }) => {
  const [form] = Form.useForm();

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const now = new Date();

  // Add 3 hours to the current time
  now.setHours(now.getHours() + 3);

  // Get the updated time
  const updatedHours = now.getHours();
  const updatedMinutes = now.getMinutes();
  const formattedTime = `${updatedHours
    .toString()
    .padStart(2, "0")}:${updatedMinutes.toString().padStart(2, "0")}`;
  console.log(formattedTime);

  const cancelButton = () => {
    setIsEditing(false);
  };
  const onfinishandler = async (values) => {
    try {
      const response = await updateInfo(values);
      if (response.isSuccess) {
        console.log(response);
        message.success(response.message);
        dispatch(setUser(response.update_userDoc));
      }
    } catch (error) {
      message.error(response.message);
    }
    setIsEditing(false);
  };
  // user.lastEditTim;
  console.log(user.lastEditTime);
  return (
    <div>
      <Form
        layout="vertical"
        onFinish={onfinishandler}
        initialValues={{
          email: `${user.email}`,

          username: `${user.username}`,
          role: `${user.role}`,
          memberid: `${user.memberID ? user.memberID : ""}`,
          phnumber: `${user.phnumber}`,
        }}
        // onFinish={onFinishHandler}
      >
        <>
          <div className="flex gap-[106px]">
            <Form.Item
              layout="horizontal"
              className="font-semibold w-[200px]"
              label="Role"
              name="role"
              rules={[
                {
                  required: true,
                  message: "Select role",
                },
              ]}
              hasFeedback
            >
              <Select placeholder="Select a role" className="ml-[38px]">
                <Select.Option value="Admin">Admin</Select.Option>
                <Select.Option value="Student">Student</Select.Option>
                <Select.Option value="Lecturer">Lecturer</Select.Option>
                <Select.Option value="Outsider">Outsider</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              layout="horizontal"
              className="font-semibold"
              label="ID"
              name="memberid"
              rules={[
                {
                  required: true,
                  message: "Enter valid phone number",
                },
              ]}
              hasFeedback
            >
              <Input
                placeholder="enter id..."
                type="number"
                className="ml-[22px] w-[204px]"
              ></Input>
            </Form.Item>
          </div>

          <div className="flex items-center gap-2">
            <Form.Item
              className="font-semibold"
              label="Username"
              name="username"
              layout="horizontal"
              rules={[
                {
                  required: true,
                  message: "Enter username",
                },
              ]}
              hasFeedback
            >
              <Input placeholder="username..." className="w-52"></Input>
            </Form.Item>
            <Form.Item
              layout="horizontal"
              className="font-semibold"
              label="Phone"
              name="phnumber"
              rules={[
                {
                  required: true,
                  message: "Enter valid phone number",
                },
              ]}
              hasFeedback
            >
              <Input placeholder="phnumber..." type="number"></Input>
            </Form.Item>
          </div>
        </>

        <Form.Item
          className="font-semibold"
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Enter valid email",
            },
          ]}
          hasFeedback
        >
          <Input placeholder="email..."></Input>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="mr-2">
            Save Changes
          </Button>
          <Button type="default" onClick={cancelButton}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
      <div className="flex gap-2 items-center">
        <WarningOutlined className="text-red-700" />
        <p className="text-red-600 text-sm">
          You edited {moment.utc(user.lastEditTime).startOf("minute").fromNow()}{" "}
          and you have to wait 3 hours to edit profile again.
        </p>
      </div>
    </div>
  );
};

export default Editprofile;
