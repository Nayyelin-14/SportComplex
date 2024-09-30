import React, { useEffect, useState } from 'react';
import {
    removeNews,
    getAllNews
  } from "../../apiEndpoints/admin";
import { message } from "antd";

const ManageNews = () => {
    const [allNews, setAllNews] = useState([]); // State to store the news
    const [error, setError] = useState(null); // State to store error
  
    // Function to fetch news
    const fetchAllNews = async () => {
      try {
        const newsData = await getAllNews(); // Call the API function
        setAllNews(newsData.news); // Set the news data in state
      } catch (err) {
        setError(err); // Set error if the request fails
      }
    };
  
    // useEffect to fetch data when component mounts
    useEffect(() => {
     fetchAllNews();
    }, []);

    const removeHandler = async (newsid) => {
        try {
          const response = await removeNews(newsid); 
      
          if (response.isSuccess) {
            message.success("News successfully removed!");
          } else {
            message.error(response.message || "Failed to remove news");
          }
        } catch (error) {
          message.error("An error occurred: " + error.message);
        }
        await fetchAllNews();
      };
  
    return (
        <>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
                <th scope="col" className="px-6 py-3 text-center">
                Title
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                Action
                </th>
            </tr>
            </thead>
            <tbody>
            {allNews && (
                <>
                {allNews.map((news) => (
                    <tr
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b "
                    key={news.id}
                    >
                    <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                    >
                        {news.title}
                    </th>
                    <th
                      className= "px-6 py-4 text-center"
                    >
                        <button
                          type="button"
                          className="font-sm  text-sm text-white bg-orange-600 p-1 px-4  hover:bg-orange-400 hover:text-black "
                          onClick={() => removeHandler(news.id)}
                        >
                          Remove
                        </button>
                    </th>
                    </tr>
                ))}
                </>
            )}
            </tbody>
            </table>
        </>
    );
}

export default ManageNews

        
