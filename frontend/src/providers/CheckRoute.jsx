import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CheckRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      // Prevent logged-in users from accessing login or register pages
      const currentPath = window.location.pathname;
      if (currentPath === "/login" || currentPath === "/register") {
        navigate("/"); // Redirect to home or dashboard page
      }
    } else {
      navigate("/login");
    }
  }, []);
  return <div>{children}</div>;
};

export default CheckRoute;
