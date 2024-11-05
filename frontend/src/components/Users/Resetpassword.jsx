import { Button, Form, Input, message } from "antd";
import React from "react";
import { PasswordChange } from "../../apiEndpoints/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

const Resetpassword = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const onFinishHandler = async (values) => {
    try {
      const response = await PasswordChange(values);
      if (response.isSuccess) {
        message.success(response.message);
        navigate("/");
        dispatch(setUser(response.userdoc));
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <div className="h-[500px]">
      <div>
        <Form
          onFinish={onFinishHandler}
          initialValues={{
            oldpass: "",
            newpass: "",
            confirmpass: "",
            userid: user?._id,
          }}
          className="flex flex-col gap-2 lg:gap-14"
        >
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
              {
                min: 5,
                message: "Password must have at least 5 characters",
              },
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
              {
                min: 5,
                message: "Password must have at least 5 characters",
              },
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
              {
                min: 5,
                message: "Password must have at least 5 characters",
              },
            ]}
            hasFeedback
          >
            <Input.Password className="border-2 border-black text-[16px]" />
          </Form.Item>
          <Form.Item
            hidden
            label={
              <p className="font-bold sm:text-[15px] md:text-[16px] lg:text-[17px] flex items-center gap-2">
                User id
              </p>
            }
            layout="vertical"
            name="userid"
            rules={[
              { required: true, message: "The new password field is required" },
              {
                min: 5,
                message: "Password must have at least 5 characters",
              },
            ]}
            hasFeedback
          >
            <Input className="border-2 border-black text-[16px]" />
          </Form.Item>
          <Button
            className="font-bold text-[18px] bg-red-900 text-white h-10"
            htmlType="submit"
          >
            Change password
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Resetpassword;
