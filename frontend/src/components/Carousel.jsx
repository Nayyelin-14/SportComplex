import React, { useContext } from "react";
import Img from "../assets/mfulogo.png";
import { NewsContext } from "./newsContext/NewsContext";
import { Link } from "react-router-dom";

const Carousel = () => {
  const { allNews, loading } = useContext(NewsContext);

  const featuredNews = allNews.slice(-3);
  console.log(featuredNews);

  return (
    <>
      <span id="services"></span>
      <div className="pt-20">
        <div className="container">
          <div className="text-center mb-20 max-w-[400px] mx-auto">
            <h1 className="text-3xl font-bold">Featured News</h1>
            <p className="text-xs text-gray-400">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Perspiciatis delectus architecto error nesciunt,
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 md:gap-5 place-items-center">
            {featuredNews.map((news, index) => (
              <Link to={`/news/${news.id}`} key={index}>
                <div
                  key={news.id}
                  data-aos="zoom-in"
                  data-aos-duration="300"
                  className="rounded-2xl bg-white hover:bg-primary dark:hover:bg-primary hover:text-white relative shadow-xl duration-high group max-w-[300px]"
                >
                  <div className="h-[100px]">
                    <img
                      src={Img}
                      alt=""
                      className="max-w-[100px] block mx-auto transform -translate-y-14
                  group-hover:scale-105 group-hover:rotate-6 duration-300"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <div className="w-full "></div>
                    <h1 className="text-lg font-bold">{news.title}</h1>
                    <p className="text-gray-500 group-hover:text-white duration-high text-sm pt-3 line-clamp-2">
                      {news.featuredline}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousel;
