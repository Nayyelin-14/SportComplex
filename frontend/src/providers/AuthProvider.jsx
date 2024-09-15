import { message } from "antd";
import { getCurrentUser } from "../apiEndpoints/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // If no token, redirect to login or home page
        navigate("/login");
        return;
      }

      const response = await getCurrentUser();

      if (response.isSuccess) {
        console.log("provider", response);
        // Store user data in Redux store
        console.log(token);
        // dispatch(setUser(response.LoginUser));
      } else {
        // Invalid token or user not found
        localStorage.removeItem("token");
        // dispatch(setUser(null));
        navigate("/login");
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  useEffect(() => {
    currentUser(); // Fetch current user on component mount
  }, []);

  return <section>{children}</section>;
};

export default AuthProvider;
