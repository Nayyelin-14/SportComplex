import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { NewsContext } from "../../components/newsContext/NewsContext";
import { Link } from "react-router-dom";
import NewsItem from "../../components/news/NewsItem";
import Lottie from "lottie-react";
import animationData4 from "../../assets/Animation - 4.json";

const NewsDetailPage = () => {
  const { allNews, loading } = useContext(NewsContext);
  const { id } = useParams();

  if (loading) {
    return <div>Loading product details...</div>;
  }

  const news = allNews.find((news) => news.id === parseInt(id));

  if (!news) {
    return <div>News not found!</div>;
  }

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
        <div className="container pb-8 sm:pb-0 grid grid-cols-1 sm:grid-cols-2 gap-x-8 place-items-center">
          <div>
            <img
              src={news.image}
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
            <h1 className="text-2xl pt-8 sm:text-3xl lg:text-4xl font-bold">
              {news.title}
            </h1>
            <p className="text-2sm pb-8 sm:text-sm lg:text-base ">
              {news.detail}
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

export default NewsDetailPage;

{
  /* <div className="min-h-[300px] sm:min-h-[250px] bg-background flex flex-col justify-center items-center">
        <div className="w-full flex justify-center">
          <img
            src={news.image}
            alt={news.title}
            className="w-[90%] sm:w-[500px] md:w-[600px] h-auto rounded-2xl my-4"
          />
        </div>
      </div>

      <div className="text-center mb-20 max-w-[400px] mx-auto">
            <h1 className="text-3xl font-bold">{news.title}</h1>
            <p className="text-lg">
              {news.detail}
            </p>
      </div>

      <div className="w-full flex justify-center">
          <p className="text-center max-w-[500px] px-4">{news.detail}</p>
      </div> */
}
