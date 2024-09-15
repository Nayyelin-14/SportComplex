import React from "react";
import Hero from "../../components/Hero";
import Carousel from "../../components/Carousel";
import Testimonials from "../../components/Testimonial";
import Layout from "../Layout/Layout";

const Home = () => {
  return (
    <>
      <Hero />
      <Carousel />
      <Testimonials />
    </>
  );
};

export default Home;
