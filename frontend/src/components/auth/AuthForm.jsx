import React, { useState } from "react";
import { Form, Input, Button, message, Select } from "antd";
import { setUser } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginaccount, registerNewUser } from "../../apiEndpoints/auth";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthForm = ({ isLoginPage }) => {
  
  const { submitting, setSubmitting } = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  console.log(user);

  const onFinishHandler = async (values) => {
    try {
      let response;
      if (isLoginPage) {
        response = await loginaccount(values);
        if (response.isSuccess) {
          message.success(response.message);
          localStorage.setItem("token", response.token);

          console.log(response);

          // const decodedUser = jwtDecode(response.token);
          dispatch(setUser(response.LogIn_Account));
          // dispatch(setUser(response.token));
          window.location.replace("/");
        } else {
          throw new Error(response.message);
        }
      } else {
        response = await registerNewUser(values);
        console.log(values);
        console.log(response);

        if (response.isSuccess) {
          message.success(response.message);
          navigate("/login");
        } else {
          throw new Error(response.message);
        }
      }
    } catch (error) {
      message.error(error.message);
    }
    // console.log(values);
  };

  return (
    <section>
      <div className="max-w-6xl mx-auto flex my-10">
        {/* left sidee */}
        <div className="w-1/2">hi there</div>
        {/* right side */}
        <div className="w-1/2">
          <Form
            layout="vertical"
            initialValues={{ email: "", password: "" }}
            onFinish={onFinishHandler}
          >
            {!isLoginPage && (
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
                className="p-3 bg-red-800 rounded-lg cursor-pointer font-medium text-white"
                htmlType="submit"
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
