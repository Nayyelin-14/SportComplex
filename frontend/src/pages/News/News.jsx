import React, { useEffect, useState } from 'react';
import {
    getAllNews
  } from "../../apiEndpoints/news";
import { message } from "antd";
import NewsItem from '../../components/news/NewsItem'

const News = () => {

  const [allNews, setAllNews] = useState([]); // State to store the news
  const [error, setError] = useState(null); // State to store error

  // Function to fetch news
  const fetchAllNews = async () => {
    try {
      const response = await getAllNews(); // Call the API function
      setAllNews(response.news); // Set the news data in state
    } catch (err) {
      setError(err); // Set error if the request fails
    }
  };

  // useEffect to fetch data when component mounts
  useEffect(() => {
   fetchAllNews();
  }, []);

  return (
    <>
      <div className="container pb-8 sm:pb-0">
        <h1 className='text-3xl font-bold justify-center items-center pt-8'>MFU NEWS</h1>
        <p className='text-primary pb-8'>What's new around campus?</p>
      </div>

      <div className="min-h-[300px] sm:min-h-[250px] bg-background">
        <div className="container pb-8 sm:pb-0 grid grid-cols-1 sm:grid-cols-2 gap-x-8">
          <div>
            <img src='../../mfu.jpg' alt='mfu' data-aos="zoom-in"
                data-aos-duration="200" className='w-[500px] h-auto rounded-2xl my-4'/>
          </div>
          <div  data-aos="zoom-in"
                data-aos-duration="500"
                data-aos-once="true"
              className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center text-white sm:text-left order-2 sm:order-1">
            <h1 className='text-3xl sm:text-3xl lg:text-4xl font-bold'>What's new around Campus?</h1>
            <p className="text-sm ">
            Discover a vibrant hub for fitness and sports at our Campus Sports Complex. With top-notch facilities including fitness centers, courts, pools, and tracks, it's the perfect place to stay active, connect with others, and achieve your athletic goals. Whether you're here to compete or just have fun, our complex has everything you need to elevate your game.
              </p>
          </div>
        </div>
      </div>

      <div className="container pb-8 sm:pb-0 grid grid-cols-1 sm:grid-cols-2 gap-x-8">
        {allNews.map((news)=>(
          <h2>{news.title}</h2>
        ))}
      </div>

    </>
  )
}

export default News