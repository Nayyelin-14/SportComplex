import React, { useState } from "react";
import { Form, Input, Button, message, Select } from "antd";
import { setUser } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginaccount, registerNewUser } from "../../apiEndpoints/auth";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationData5 from "../../assets/Animation - 5.json";
import { jwtDecode } from "jwt-decode";

const AuthForm = ({ isLoginPage }) => {
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const onFinishHandler = async (values) => {
    try {
      setSubmitting(true);
      let response;
      if (isLoginPage) {
        response = await loginaccount(values);
        if (response.isSuccess) {
          message.success(response.message);
          localStorage.setItem("token", response.token);

          // console.log(response);

          // const decodedUser = jwtDecode(response.token);
          dispatch(setUser(response.LogIn_Account));
          // dispatch(setUser(response.token));
          window.location.replace("/");
        } else {
          throw new Error(response.message);
        }
      } else {
        response = await registerNewUser(values);
        // console.log(values);
        // console.log(response);

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
    <section className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center p-12 sm:gap-10 ">
        {/* left side */}
        <div className="hidden md:flex">
          <Lottie
            animationData={animationData5}
            style={{ width: 400, height: 400 }}
          />
        </div>
        {/* right side */}
        <div>
          <Form
            layout="vertical"
            initialValues={{ email: "", password: "" }}
            onFinish={onFinishHandler}
          >
            <div className="text-3xl pb-5 sm:pb-10 font-semibold">
              {isLoginPage ? (
                <h1 className="text-red-900 font-bold">
                  Login to your account
                </h1>
              ) : (
                <h1 className="text-red-900 font-bold">Sign Up new account</h1>
              )}
            </div>
            {!isLoginPage && (
              <>
                <div className="flex md:flex-col gap-6 md:gap-0 lg:gap-10">
                  <Form.Item
                    layout="horizontal"
                    className="font-semibold w-full sm:w-[398px] md:w-2/3 lg:w-full"
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
                    <Select
                      placeholder="Select a role"
                      className="w-full sm:w-auto"
                    >
                      <Select.Option value="Admin">Admin</Select.Option>
                      <Select.Option value="Student">Student</Select.Option>
                      <Select.Option value="Lecturer">Lecturer</Select.Option>
                      <Select.Option value="Outsider">Outsider</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    layout="horizontal"
                    className="font-semibold w-full"
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
                      className="w-[180px] sm:w-[170px] ml-3"
                    ></Input>
                  </Form.Item>
                </div>

                <div className="flex-col lg:flex items-center gap-2">
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
                    <Input
                      placeholder="username..."
                      className="w-full sm:w-full"
                    ></Input>
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
                    <Input
                      className="sm:ml-6 sm:w-[94%]"
                      placeholder="phnumber..."
                      type="number"
                    ></Input>
                  </Form.Item>
                </div>
              </>
            )}
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
            <Form.Item
              className="my-1  font-semibold"
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Enter password",
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="password..." />
            </Form.Item>
            <div className="my-3">
              {isLoginPage ? (
                <div>
                  <p className="inline-block font-medium ">
                    Dont' have an account?
                  </p>
                  <Link to={"/register"} className="text-blue-600 ml-2">
                    Register here
                  </Link>
                </div>
              ) : (
                <div>
                  <p className="inline-block font-medium ">
                    Already have an account?
                  </p>
                  <Link to={"/login"} className="text-blue-600 ml-2">
                    Login here
                  </Link>
                </div>
              )}
            </div>
            <Form.Item>
              <Button
                className="py-5 bg-red-800 rounded-lg w-full sm:w-full font-medium text-white"
                htmlType="submit"
                disabled={submitting}
              >
                {isLoginPage ? "Login" : "Sing up"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;
