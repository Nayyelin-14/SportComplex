import React from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  return (
    <div>
      <header className="z-70">
        <Navbar />
      </header>

      <main>{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
