import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { setUser } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginaccount, registerNewUser } from "../../apiEndpoints/auth";
import { Link } from "react-router-dom";
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
          console.log(response.token);
          dispatch(setUser(response.token));
          window.location.replace("/");
        } else {
          throw new Error(response.message);
        }
      } else {
        response = await registerNewUser(values);
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
  };

  return (
    <section>
      <div className="max-w-6xl mx-auto flex my-10">
        {/* left sidee */}
        <div className="w-1/2">mmsp</div>
        {/* right side */}
        <div className="w-1/2">
          <Form
            layout="vertical"
            initialValues={{ email: "", password: "" }}
            onFinish={onFinishHandler}
          >
            {!isLoginPage && (
              <Form.Item
                className="font-semibold"
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Enter username",
                  },
                ]}
                hasFeedback
              >
                <Input placeholder="username..."></Input>
              </Form.Item>
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
              <Input placeholder="username..."></Input>
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
