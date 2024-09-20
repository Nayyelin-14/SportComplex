import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { setUser } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";

const BookingFrom = () => {
  const { selectedTime } = useSelector((state) => state.booking);
  const { SportType } = useSelector((state) => state.booking);
  const { user } = useSelector((state) => state.user);

  const onFinishHandler = (values) => {
    console.log(values);
  };

  return (
    <section>
      <div className="max-w-5xl mx-auto my-10">
        <h3 className="my-3 text-4xl font-semibold">Sport booking</h3>
        <Form
          layout="horizontal"
          onFinish={onFinishHandler}
          initialValues={{
            sporttype: SportType, // Preload the sporttype from Redux
            status: user.role, // Preload the status (user role) from Redux
            studentid: "",
            name: "",
            phone: "",
            session: selectedTime,
          }}
        >
          <div className="flex gap-6">
            <Form.Item
              className="font-semibold my-5"
              label="Sport Type"
              name="sporttype"
              type="string"
            >
              <Input
                className="w-[130px] h-[30px] ml-9"
                value={SportType} // Redux value shown here
                placeholder={SportType}
                disabled
              />
            </Form.Item>

            <Form.Item
              className="font-semibold my-5"
              label="Session"
              name="session"
              type="string"
            >
              <Input
                className="w-[130px] h-[30px] ml-9"
                value={selectedTime} // Redux value shown here
                placeholder={selectedTime}
                disabled
              />
            </Form.Item>
          </div>

          <Form.Item
            className="font-semibold my-2"
            label="Status"
            name="status"
            type="string"
          >
            <select
              className="w-[130px] h-[30px] ml-16"
              value={user.role} // Redux value shown here
            >
              <option value="student">Student</option>
              <option value="Staff">Staff</option>
              <option value="lecturer">Lecturer</option>
              <option value="outsider">Outsider</option>
            </select>
          </Form.Item>

          <Form.Item
            className="font-semibold my-5"
            label="Student ID"
            name="studentid"
            type="number"
            rules={[
              {
                required: true,
                message: "Enter your student id",
              },
            ]}
            hasFeedback
          >
            <Input className="w-[200px] ml-6" type="number"></Input>
          </Form.Item>

          <Form.Item
            className="my-1  font-semibold"
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Enter name",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="name..." className="ml-14 w-[220px]" />
          </Form.Item>

          <Form.Item
            className="font-semibold my-5"
            label="Phone"
            name="phone"
            type="number"
            rules={[
              {
                required: true,
                message: "Enter your phone number",
              },
            ]}
            hasFeedback
          >
            <Input
              className="w-[200px] ml-14"
              type="number"
              placeholder="phone number..."
            />
          </Form.Item>
          <div>
            <Form.Item>
              <Button
                className="p-3 bg-red-800 rounded-lg cursor-pointer font-medium text-white"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default BookingFrom;
