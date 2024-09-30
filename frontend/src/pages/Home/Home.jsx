import React, { useEffect } from "react";
import Hero from "../../components/Hero";
import Carousel from "../../components/Carousel";
import Testimonials from "../../components/Testimonial";
import Layout from "../Layout/Layout";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const Home = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const expireLoginToken = () => {
  //   setTimeout(() => {
  //     localStorage.removeItem("token");
  //     dispatch(setUser(null));
  //     navigate("/login");
  //     message.info("Session expired. You have been logged out.");
  //   }, 100000); // 1 hour in milliseconds
  // };
  // useEffect(() => {
  //   expireLoginToken();
  // }, []);
  return (
    <>
      <Hero />
      <Carousel />
      <Testimonials />
    </>
  );
};

export default Home;
