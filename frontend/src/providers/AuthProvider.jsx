import { message } from "antd";
import { getCurrentUser } from "../apiEndpoints/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setActiveTime, setImages, setUser } from "../store/userSlice";
import ClipLoader from "react-spinners/ClipLoader";

const AuthProvider = ({ children, allowedRoles = [] }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true); // Set loading to true initially

  //inactive hours
  const two_hours = 2 * 60 * 60 * 1000;
  // const two_hours = 2 * 60 * 60 * 1000;

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

  //
  // Function to log out the user
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("activeTime");
    dispatch(setUser(null));
    dispatch(setActiveTime(null));
    navigate("/login");
    message.success("You have been logged out due to inactivity.");
  };
  // Function to check inactivity
  const checkInactivity = () => {
    const lastActiveTime = localStorage.getItem("activeTime");
    if (lastActiveTime) {
      const currentTime = Date.now();
      const timeDifference = currentTime - lastActiveTime;
      if (timeDifference > two_hours) {
        handleLogout(); // Log out if more than 2 hours of inactivity
      }
    }
  };
  const updateLastActiveTime = () => {
    const currentTime = Date.now();
    localStorage.setItem("activeTime", currentTime);
    dispatch(setActiveTime(currentTime));
  };
  useEffect(() => {
    // Listen for user interactions
    window.addEventListener("mousemove", updateLastActiveTime);
    window.addEventListener("click", updateLastActiveTime);
    window.addEventListener("keydown", updateLastActiveTime);

    // Check inactivity every minute
    const interval = setInterval(checkInactivity, 60 * 1000);

    return () => {
      // Clean up event listeners and interval on unmount
      window.removeEventListener("mousemove", updateLastActiveTime);
      window.removeEventListener("click", updateLastActiveTime);
      window.removeEventListener("keydown", updateLastActiveTime);
      clearInterval(interval);
    };
  }, []);
  //
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
