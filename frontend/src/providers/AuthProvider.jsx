import { message } from "antd";
import { getCurrentUser } from "../apiEndpoints/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/userSlice";

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { user } = useSelector((state) => state.user);
  // console.log(user);
  const currentUser = async () => {
    try {
      console.log("current token", token);
      const response = await getCurrentUser();

      if (response.isSuccess) {
        console.log("provider", response);
        message.success(response.message);
        // Store user data in Redux store
        dispatch(setUser(response.currentUser));
      }

      if (user === null || !token) {
        {
          // Invalid token or user not found
          localStorage.removeItem("token");
          dispatch(setUser(null));
          navigate("/login");

          throw new Error("Uaunthorized");
        }
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  useEffect(() => {
    if (token) {
      currentUser();
    } // Fetch current user on component mount
    else {
      navigate("/login");
      message.error("Unauthorized");
    }
  }, [token]);

  return <section>{children}</section>;
};

export default AuthProvider;
