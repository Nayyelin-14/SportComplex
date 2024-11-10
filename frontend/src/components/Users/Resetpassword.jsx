import { Button, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { PasswordChange } from "../../apiEndpoints/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

const Resetpassword = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [ischanging, setIschanging] = useState(false);
  const useResponsiveGap = () => {
    const [gap, setGap] = useState("gap-2");

    const updateGap = () => {
      const width = window.innerWidth;

      if (width >= 576) {
        setGap("gap-12"); // sm breakpoint (576px)
      } else {
        setGap("gap-2");
      }
    };

    useEffect(() => {
      updateGap(); // Initial call on component mount
      window.addEventListener("resize", updateGap);

      // Cleanup event listener on unmount
      return () => window.removeEventListener("resize", updateGap);
    }, []);

    return gap;
  };
  const gapClass = useResponsiveGap();
  const onFinishHandler = async (values) => {
    try {
      setIschanging(true);
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
    } finally {
      setIschanging(false);
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
          className={`flex flex-col ${gapClass}`}
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
            <Input.Password className="border-2 border-black sm:text-[16px]" />
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
            <Input.Password className="border-2 border-black sm:text-[16px]" />
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
            <Input.Password className="border-2 border-black sm:text-[16px]" />
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
            className="font-bold sm:text-[18px] bg-red-900 text-white sm:h-10 h-[37px]"
            htmlType="submit"
            disabled={ischanging}
          >
            Change password
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Resetpassword;
