import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { setUser } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const AuthForm = ({ isLoginPage }) => {
  // const { login, setLogin } = useState();
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { user } = useSelector((state) => state.reducer);
  // console.log(user);

  const LogoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    navigate("/");
  };

  return (
    <section>
      <div>
        {/* left sidee */}
        <div>mmmsp</div>
        {/* right side */}
        <div></div>
      </div>
    </section>
  );
};

export default AuthForm;
