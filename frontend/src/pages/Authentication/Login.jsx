import React from "react";
import AuthForm from "../../components/auth/AuthForm";

const Login = () => {
  return (
    <div className="max-w-7xl  mx-auto">
      <AuthForm isLoginPage={true} />
    </div>
  );
};

export default Login;
