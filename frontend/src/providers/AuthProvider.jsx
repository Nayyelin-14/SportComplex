import { message } from "antd";
import { getCurrentUser } from "../apiEndpoints/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setImages, setUser } from "../store/userSlice";

const AuthProvider = ({ children, allowedRoles = [] }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { user } = useSelector((state) => state.user);
  // const { isProcessing } = useSelector((state) => state.loader);

  const currentUser = async () => {
    try {
      // dispatch(setLoader(true));

      const response = await getCurrentUser();
      if (response.isSuccess) {
        // Store user data in Redux store
        dispatch(setUser(response.currentUser));
        dispatch(setImages(response.currentUser?.profileImage));

        // Check if the user role is allowed
        if (!allowedRoles.includes(response.currentUser.role)) {
          navigate("/");
          return;
        }
      } else {
        navigate("/login");
      }
    } catch (err) {
      message.error("Authentication failed, please log in again.");
      navigate("/login");
    } finally {
      // dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    // Run this effect only if there is a token
    if (token && !user) {
      currentUser();
    } else if (!token) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // If user is not found after authentication, redirect to login
  if (!user && !isProcessing) {
    setLoader(true);
    return navigate("/login");
  }

  // Render the children if authentication passed
  return <section>{children}</section>;
};

export default AuthProvider;
