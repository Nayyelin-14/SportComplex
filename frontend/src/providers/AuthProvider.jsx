import { message } from "antd";
import { getCurrentUser } from "../apiEndpoints/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setImages, setUser } from "../store/userSlice";
import ClipLoader from "react-spinners/ClipLoader";

const AuthProvider = ({ children, allowedRoles = [] }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true); // Set loading to true initially

  const currentUser = async () => {
    try {
      const response = await getCurrentUser();
      if (response.isSuccess) {
        // Store user data in Redux store
        dispatch(setUser(response.currentUser));
        dispatch(setImages(response.currentUser?.profileImage));

        // Immediately check if the role is allowed
        if (!allowedRoles.includes(response.currentUser.role)) {
          setLoading(false); // Ensure loading stops before navigating
          navigate("/"); // Redirect to home if role is not allowed
          return;
        }
      } else {
        navigate("/login");
      }
    } catch (err) {
      message.error("Authentication failed, please log in again.");
      navigate("/login");
    } finally {
      setLoading(false); // Stop loading when finished
    }
  };

  useEffect(() => {
    // Run this effect only if there is a token
    if (token) {
      if (!user) {
        currentUser();
      } else if (!allowedRoles.includes(user.role)) {
        setLoading(false); // Stop loading if user role isn't allowed
        navigate("/");
      } else {
        setLoading(false); // Stop loading if user is already allowed
      }
    } else {
      navigate("/login");
      setLoading(false); // Stop loading if no token is found
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user]);

  // Show a spinner while loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={100} />
      </div>
    );
  }

  // If no user is found after loading, prevent unauthorized access
  if (!user) {
    return null;
  }

  // Render the children if authentication and role check passed
  return <section>{children}</section>;
};

export default AuthProvider;
