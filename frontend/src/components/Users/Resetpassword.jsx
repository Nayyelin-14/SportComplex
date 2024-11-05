import { Button, Form, Input } from "antd";
import React from "react";

const Resetpassword = () => {
  const onFinishHandler = (values) => {
    console.log(values);
  };
  return (
    <div className="h-[500px]">
      <div>
        <Form onFinish={onFinishHandler} className="flex flex-col gap-14">
          <Form.Item
            label={
              <p className="font-bold sm:text-[15px] md:text-[16px] lg:text-[17px] flex items-center gap-2">
                Old Password
              </p>
            }
            layout="vertical"
            name="oldpass"
            rules={[
              { required: true, message: "The old password field is required" },
            ]}
            hasFeedback
          >
            <Input.Password className="border-2 border-black text-[16px]" />
          </Form.Item>
          <Form.Item
            label={
              <p className="font-bold sm:text-[15px] md:text-[16px] lg:text-[17px] flex items-center gap-2">
                New Password
              </p>
            }
            layout="vertical"
            name="newpass"
            rules={[
              { required: true, message: "The new password field is required" },
            ]}
            hasFeedback
          >
            <Input.Password className="border-2 border-black text-[16px]" />
          </Form.Item>

          <Form.Item
            label={
              <p className="font-bold sm:text-[15px] md:text-[16px] lg:text-[17px] flex items-center gap-2">
                Confirm new Password
              </p>
            }
            layout="vertical"
            name="confirmpass"
            rules={[
              { required: true, message: "The new password field is required" },
            ]}
            hasFeedback
          >
            <Input.Password className="border-2 border-black text-[16px]" />
          </Form.Item>
          <Button htmlType="submit">Change password</Button>
        </Form>
      </div>
    </div>
  );
};

export default Resetpassword;
