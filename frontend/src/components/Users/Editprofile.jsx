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
  const [iswarning, setIswarning] = useState(false);
  const dispatch = useDispatch();

  const now = moment(); // Get current time

  const cancelButton = () => {
    setIsEditing(false);
  };

  const onfinishandler = async (values) => {
    const lastEditTime = moment(user.lastEditTime);
    const timeDifference = now.diff(lastEditTime, "minutes"); // Time difference in minutes

    // now.diff(lastEditTime, "minutes") calculates the difference between the current time (now) and the lastEditTime. The "minutes" argument specifies that the result should be in minutes.
    // console.log(lastEditTime);
    // console.log(timeDifference);
    // Check if 1 minute has passed since last edit
    if (timeDifference < 1) {
      setIswarning(true);
      message.error("You must wait 1 minute before editing again.");
      return;
    }

    try {
      const response = await updateInfo(values);
      if (response.isSuccess) {
        message.success(response.message);
        dispatch(setUser(response.update_userDoc));
        setIsEditing(false);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div>
      <Form
        layout="vertical"
        onFinish={onfinishandler}
        initialValues={{
          email: user.email,
          username: user.username,
          role: user.role,
          memberid: user.memberID ? user.memberID : "",
          phnumber: user.phnumber,
        }}
      >
        <div className="flex gap-[106px]">
          <Form.Item
            layout="horizontal"
            className="font-semibold w-[200px]"
            label="Role"
            name="role"
            rules={[{ required: true, message: "Select role" }]}
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
            rules={[{ required: true, message: "Enter valid phone number" }]}
            hasFeedback
          >
            <Input
              placeholder="enter id..."
              type="number"
              className="ml-[22px] w-[204px]"
            />
          </Form.Item>
        </div>

        <div className="flex items-center gap-2">
          <Form.Item
            className="font-semibold"
            label="Username"
            name="username"
            layout="horizontal"
            rules={[{ required: true, message: "Enter username" }]}
            hasFeedback
          >
            <Input placeholder="username..." className="w-52" />
          </Form.Item>
          <Form.Item
            layout="horizontal"
            className="font-semibold"
            label="Phone"
            name="phnumber"
            rules={[{ required: true, message: "Enter valid phone number" }]}
            hasFeedback
          >
            <Input placeholder="phnumber..." type="number" />
          </Form.Item>
        </div>

        <Form.Item
          className="font-semibold"
          label="Email"
          name="email"
          rules={[
            { required: true, type: "email", message: "Enter valid email" },
          ]}
          hasFeedback
        >
          <Input placeholder="email..." />
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
