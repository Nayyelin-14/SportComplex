import React, { useEffect, useState } from "react";
import {
  Card,
  Avatar,
  Button,
  Form,
  Input,
  Select,
  message,
  Upload,
} from "antd";
import "./TabBars.css";

import { useDispatch, useSelector } from "react-redux";
import { updateInfo } from "../../apiEndpoints/auth";
import { setUser } from "../../store/userSlice";
import { UploadOutlined, WarningOutlined } from "@ant-design/icons";
import moment from "moment";
import complex from "./complex.jpg";
const Editprofile = () => {
  const [form] = Form.useForm();
  const { user } = useSelector((state) => state.user);
  const [iswarning, setIswarning] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const now = moment(); // Get current time

  const onfinishandler = async (values) => {
    try {
      setLoading(true); // Set loading state
      const response = await updateInfo(values);
      if (response.isSuccess) {
        message.success(response.message);
        dispatch(setUser(response.update_userDoc));
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };
  // Update the form fields when user data changes
  useEffect(() => {
    form.setFieldsValue({
      email: user.email,
      username: user.username,
      role: user.role,
      memberid: user.memberID ? user.memberID : "",
      phnumber: user.phnumber,
    });
  }, [user, form]);
  return (
    <div>
      <Form form={form} layout="vertical" onFinish={onfinishandler}>
        <Form.Item
          layout="vertical"
          className="font-semibold"
          label={<p className="text-[16px] sm:text-[19px] font-semibold">ID</p>}
          name="memberid"
          rules={[{ required: true, message: "Enter valid phone number" }]}
          hasFeedback
        >
          <Input
            placeholder="enter id..."
            type="number"
            className="w-[100%] sm:h-[45px] sm:text-[17px] border-red-900 sm:border-2 h-[33px]"
          />
        </Form.Item>

        <Form.Item
          className="font-semibold"
          label={
            <p className="text-[16px] sm:text-[19px] font-semibold">Username</p>
          }
          name="username"
          layout="vertical"
          rules={[{ required: true, message: "Enter username" }]}
          hasFeedback
        >
          <Input
            placeholder="username..."
            className="w-[100%] sm:h-[45px] sm:text-[17px] border-red-900 sm:border-2"
          />
        </Form.Item>
        <Form.Item
          layout="vertical"
          className="font-semibold"
          label={
            <p className="text-[16px] sm:text-[19px] font-semibold">
              Phone Number
            </p>
          }
          name="phnumber"
          rules={[{ required: true, message: "Enter valid phone number" }]}
          hasFeedback
        >
          <Input
            className="w-[100%] sm:h-[45px] sm:text-[17px] border-red-900 sm:border-2"
            placeholder="phnumber..."
            type="number"
          />
        </Form.Item>

        <Form.Item
          className="font-semibold "
          label={
            <p className="text-[16px] sm:text-[19px] font-semibold">Email</p>
          }
          name="email"
          rules={[
            { required: true, type: "email", message: "Enter valid email" },
          ]}
          hasFeedback
        >
          <Input
            className="w-[100%] sm:h-[45px] sm:text-[17px] border-red-900 border-2"
            placeholder="email..."
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="mr-2"
            disabled={iswarning}
          >
            {loading ? "Saving" : "Save Changes"}
          </Button>
        </Form.Item>
      </Form>

      {iswarning && (
        <div className="flex gap-2 items-center">
          <WarningOutlined className="text-red-700" />
          <p className="text-red-600 text-sm">
            You edited {moment(user.lastEditTime).startOf("minute").fromNow()}{" "}
            and you have to wait 1 minute to edit your profile again.
          </p>
        </div>
      )}
    </div>
  );
};

export default Editprofile;

{
  // const lastEditTime = moment(user.lastEditTime);
  // const timeDifference = now.diff(lastEditTime, "minutes"); // Time difference in minutes
  // now.diff(lastEditTime, "minutes") calculates the difference between the current time (now) and the lastEditTime. The "minutes" argument specifies that the result should be in minutes.
  // console.log(lastEditTime);
  // console.log(timeDifference);
  // Check if 1 minute has passed since last edit
  // if (timeDifference < 1) {
  //   setIswarning(true);
  //   setTimeout(() => {
  //     setIswarning(false);
  //   }, 60000);
  //   return;
  // }
  /* <Form.Item
          layout="vertical"
          className="font-semibold w-[200px]"
          label=<p className="text-[19px] font-semibold">Role</p>
          name="role"
          rules={[{ required: true, message: "Select role" }]}
          hasFeedback
        >
          <Select
            placeholder="Select a role"
            className="w-[100%] h-[50px] text-[17px] border-red-900 border-2"
          >
            <Select.Option value="Admin">Admin</Select.Option>
            <Select.Option value="Student">Student</Select.Option>
            <Select.Option value="Lecturer">Lecturer</Select.Option>
            <Select.Option value="Outsider">Outsider</Select.Option>
          </Select>
        </Form.Item> */
}
