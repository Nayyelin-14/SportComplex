import React, { useState } from "react";
import { Form, Input, Button, message, Select } from "antd";
import { setActiveTime, setUser } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginaccount, registerNewUser } from "../../apiEndpoints/auth";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationData5 from "../../assets/Animation - 5.json";
// import jwtDecode from "jwt-decode"; // Remove curly braces since it's not a named import

const AuthForm = ({ isLoginPage }) => {
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinishHandler = async (values) => {
    try {
      setSubmitting(true);
      let response;
      if (isLoginPage) {
        response = await loginaccount(values);
        if (response.isSuccess) {
          message.success(response.message);
          localStorage.setItem("token", response.token);
          localStorage.setItem("activeTime", Date.now());
          dispatch(setActiveTime(Date.now()));
          dispatch(setUser(response.LogIn_Account));
          window.location.replace("/");
        } else {
          throw new Error(response.message);
        }
      } else {
        response = await registerNewUser(values);
        if (response.isSuccess) {
          message.success(response.message);
          navigate("/login");
        } else {
          throw new Error(response.message);
        }
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="container mx-auto p-6">
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center lg:h-[575px] ${
          isLoginPage && `lg:h-[500px]`
        }`}
      >
        {/* Left Side Animation */}
        <div className="hidden md:flex justify-center">
          <Lottie
            animationData={animationData5}
            style={{ width: 350, height: 350 }}
          />
        </div>

        {/* Right Side Form */}
        <div>
          <Form
            layout="vertical"
            initialValues={{ email: "", password: "" }}
            onFinish={onFinishHandler}
            className="max-w-lg mx-auto"
          >
            <div className="text-xl pb-6 text-center">
              {isLoginPage ? (
                <h1 className="text-primary">Login To Your Account</h1>
              ) : (
                <h1 className="text-red-900">Create New Account</h1>
              )}
            </div>

            {/* Extra Fields for Registration */}
            {!isLoginPage && (
              <>
                <div className="lg:flex lg:items-center lg:gap-20">
                  <Form.Item
                    label="Role"
                    name="role"
                    rules={[
                      { required: true, message: "Please select a role" },
                    ]}
                    hasFeedback
                    className="lg:w-2/5"
                  >
                    <Select placeholder="Select a role">
                      <Select.Option value="Admin">Admin</Select.Option>
                      <Select.Option value="Student">Student</Select.Option>
                      <Select.Option value="Lecturer">Lecturer</Select.Option>
                      <Select.Option value="Outsider">Outsider</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Member ID"
                    name="memberid"
                    rules={[{ required: true, message: "Enter your ID" }]}
                    hasFeedback
                  >
                    <Input
                      className="border-black lg:w-full"
                      placeholder="Enter your ID..."
                      type="number"
                    />
                  </Form.Item>
                </div>

                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    { required: true, message: "Please enter a username" },
                  ]}
                  hasFeedback
                >
                  <Input
                    className="border-black"
                    placeholder="Enter your username..."
                  />
                </Form.Item>

                <Form.Item
                  label="Phone Number"
                  name="phnumber"
                  rules={[
                    { required: true, message: "Enter a valid phone number" },
                  ]}
                  hasFeedback
                >
                  <Input
                    className="border-black"
                    placeholder="Enter your phone number..."
                    type="number"
                  />
                </Form.Item>
              </>
            )}

            {/* Email and Password Fields */}
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Enter a valid email",
                },
              ]}
              hasFeedback
            >
              <Input
                placeholder="Enter your email..."
                className="border-black"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Enter your password" }]}
              hasFeedback
            >
              <Input.Password
                placeholder="Enter your password..."
                className="border-black"
              />
            </Form.Item>

            {/* Redirect Links */}
            <div className="text-center my-4">
              {isLoginPage ? (
                <p>
                  Don't have an account?{" "}
                  <Link to="/register" className="text-blue-600">
                    Register here
                  </Link>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-600">
                    Login here
                  </Link>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-red-800 text-white py-3 rounded-lg"
                loading={submitting}
              >
                {isLoginPage ? "Login" : "Sign Up"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;
