import React, { useContext, useEffect, useState } from "react";
import NewsItem from "../../components/news/NewsItem";
import { NewsContext } from "../../components/newsContext/NewsContext";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationData4 from "../../assets/Animation - 4.json";

const News = () => {
  const { allNews, loading } = useContext(NewsContext);

  return (
    <>
      <div className="container pb-8 sm:pb-0 flex flex-col sm:flex-row items-center sm:items-start justify-between">
        <div className="sm:w-1/2 sm:text-left text-center flex flex-col sm:items-start items-center">
          <h1 className="text-3xl font-bold pt-8">MFU NEWS</h1>
          <p className="text-primary font-bold">What's new around campus?</p>
        </div>

        <div className="sm:w-1/2 flex justify-center sm:justify-end">
          <Lottie
            animationData={animationData4}
            style={{ width: 150, height: 150 }}
          />
        </div>
      </div>

      <div className="min-h-[300px] sm:min-h-[250px] bg-background">
        <div className="container pb-8 sm:pb-0 grid grid-cols-1 sm:grid-cols-2 place-items-center gap-x-8">
          <div>
            <img
              src="../../mfu.jpg"
              alt="mfu"
              data-aos="zoom-in"
              data-aos-duration="200"
              className="w-[500px] h-auto rounded-2xl my-4"
            />
          </div>
          <div
            data-aos="zoom-in"
            data-aos-duration="500"
            data-aos-once="true"
            className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center text-white sm:text-left order-2 sm:order-1"
          >
            <h1 className="text-3xl pt-8 sm:text-3xl lg:text-4xl font-bold">
              What's new around campus?
            </h1>
            <p className="text-2sm pb-8 sm:text-sm lg:text-base ">
              Discover a vibrant hub for fitness and sports at our Campus Sports
              Complex. With top-notch facilities including fitness centers,
              courts, pools, and tracks, it's the perfect place to stay active,
              connect with others, and achieve your athletic goals. Whether
              you're here to compete or just have fun, our complex has
              everything you need to elevate your game.
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <div>Loading News...</div>
      ) : (
        <div className="container py-8 sm:py-14 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-14">
          {allNews.map((news) => (
            <Link to={`/news/${news.id}`}>
              <NewsItem
                key={news.id}
                title={news.title}
                image={news.image}
                featuredline={news.featuredline}
              />
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default News;

// // State to store the news
// const [error, setError] = useState(null); // State to store error

// // Function to fetch news
// const fetchAllNews = async () => {
//   try {
//     const response = await getAllNews(); // Call the API function
//     setAllNews(response.news); // Set the news data in state
//   } catch (err) {
//     setError(err); // Set error if the request fails
//   }
// };

// // useEffect to fetch data when component mounts
// useEffect(() => {
//   fetchAllNews();
// }, []);
