import React from "react";

const NewsItem = ({ allNews }) => {
  console.log(allNews);
  // Get the last image from the profileImage array
  const lastImage =
    allNews && allNews.profileImage && allNews.profileImage.length > 0
      ? allNews.profileImage[allNews.profileImage.length - 1]
      : ""; // Use a fallback value if profileImage is undefined or empty
  return (
    <>
      {allNews ? (
        allNews.map((news) => {
          <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 ">
            <div className="w-64 h-30">
              <img
                className="max-w-full h-auto object-contain rounded-t-lg  md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                src={lastImage}
                alt=""
              />
            </div>
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-base font-bold tracking-tight text-gray-900">
                {news?.title || "No Title Available"} {/* Fallback for title */}
              </h5>
              <p className="mb-3 text-sm text-gray-700">
                {" "}
                {news?.featuredline || "No Featured Line Available"}{" "}
                {/* Fallback */}
              </p>
            </div>
          </div>;
        })
      ) : (
        <>
          <p>Not found</p>
        </>
      )}
    </>
  );
};

export default NewsItem;

{
  /* <div>
<a ref="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={props.image} alt=""/>
    <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.title}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{props.featuredline}</p>
    </div>
</a>
</div> */
}
