import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center h-screen  flex flex-col items-center justify-center gap-5">
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="text-red-900 font-semibold hover:border-b hover:border-black"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
