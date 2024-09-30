import React, { useState, useEffect } from 'react';
import { addNews, getAllNews, upload_img } from "../../apiEndpoints/admin";
import { message } from 'antd';

const CreateNews = () => {

  const [allNews, setAllNews] = useState([]); // State to store the news
  const [error, setError] = useState(null); // State to store error
  const [image, setimage] = useState(false);
  const [newsData, setNewsData] = useState({
    title: "",
    image: "",
    detail: "",
    featuredline: "",
  });

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

  const imageHandler = (e) => {
    setimage(e.target.files[0]);
  }

  // Handles text input fields
  const changeHandler = (e) => {
    const { name, value } = e.target; // Destructure name and value from the event target
    setNewsData({ ...newsData, [name]: value });
  };

  // Submit the form and add the news
  const addNewsHandler = async (e) => {
    e.preventDefault(); // Prevent form's default submission behavior

    let formData = new FormData();           //uploading image using FormData
    formData.append('news',image);
    let responseData;

    try{
      responseData = await upload_img(formData);
        message.success("Upload Successfully");
        console.log(responseData);
        newsData.image = responseData.image_url;
        console.log(newsData);
    }catch(error){
      message.error("An error occurred: " + error.message);
    }
    
    try {
      // Directly send the newsData as JSON to the API
      const response = await addNews(newsData);

      if (response.isSuccess) {
        message.success("News successfully added!");
        // Reset form after successful submission
        setNewsData({
          title: "",
          image: "",
          detail: "",
          featuredline: "",
        });
      } else {
        message.error(response.message || "Failed to add news");
      }
    } catch (error) {
      message.error("An error occurred: " + error.message);
    }
    await fetchAllNews();
  };

  return (
  <form onSubmit={addNewsHandler} className="space-y-6 max-w-lg mx-auto p-4">
    <div className="flex flex-col">
      <label className="mb-2 text-sm font-semibold text-gray-700">Title</label>
      <input
        type="text"
        name="title"
        value={newsData.title}
        onChange={changeHandler}
        required
        className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <div className="flex flex-col">
      <label className="mb-2 text-sm font-semibold text-gray-700">Detail</label>
      <textarea
        name="detail"
        value={newsData.detail}
        onChange={changeHandler}
        required
        className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
      ></textarea>
    </div>

    <div className="flex flex-col">
      <label className="mb-2 text-sm font-semibold text-gray-700">Featured Line</label>
      <input
        type="text"
        name="featuredline"
        value={newsData.featuredline}
        onChange={changeHandler}
        required
        className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <div className="flex flex-col">
    <label className="mb-2 text-sm font-semibold text-gray-700">Upload Image</label>
    <input
      type="file"
      name="image"
      accept="image/*"
      onChange={imageHandler}
      className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
    <span className="text-xs text-gray-500 mt-1">Max file size: 2MB</span>
    </div>

    <button
      type="submit"
      className="w-full py-2 px-4 bg-secondary text-white font-semibold rounded-md shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Add News
    </button>
  </form>

    );
};

export default CreateNews;

