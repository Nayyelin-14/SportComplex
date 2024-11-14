import React, { useEffect, useState } from "react";
import { removeNews, getAllNews } from "../../apiEndpoints/admin";
import { message } from "antd";
import { TrashIcon } from "@heroicons/react/24/outline";

const ManageNews = () => {
  const [allNews, setAllNews] = useState([]);
  const [error, setError] = useState(null);

  const fetchAllNews = async () => {
    try {
      const newsData = await getAllNews();
      setAllNews(newsData.news);
    } catch (err) {
      setError(err);
    }
  };

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
    <div className="w-full px-2 sm:px-4">
      <table className="hidden sm:table w-full text-sm text-left rtl:text-right text-gray-500">
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
                  className="odd:bg-white even:bg-gray-50 border-b"
                  key={news.id}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 text-center"
                  >
                    {news.title}
                  </th>
                  <td className="px-6 py-4 text-center">
                    <button
                      type="button"
                      className=" text-red-800 p-1 hover:text-black"
                      onClick={() => removeHandler(news.id)}
                    >
                      <TrashIcon width={20} height={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>

      {/* Responsive design for smaller screens */}
      <div className="sm:hidden space-y-4">
        {allNews &&
          allNews.map((news) => (
            <div
              key={news.id}
              className="border p-4 rounded-lg bg-gray-50 dark:bg-gray-800 flex justify-between items-center"
            >
              <div className="text-gray-900 dark:text-white font-medium">
                {news.title}
              </div>
              <div className=" text-right">
                <button
                  type="button"
                  className=" text-red-800 p-1 hover:text-black"
                  onClick={() => removeHandler(news.id)}
                >
                  <TrashIcon width={20} height={20} />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ManageNews;
