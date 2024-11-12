import React from "react";
import LottieSlideshow from "./LottieSlideshow";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="min-h-[550px] sm:min-h-[650px] bg-custom-svg flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200 ">
        <div className="container pb-8 sm:pb-0">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div
              data-aos-once="true"
              className="flex flex-col justify-center gap-12 pt-1 sm:pt-0 text-center sm:text-left order-2 sm:order-1"
            >
              <h1
                data-aos="zoom-out"
                data-aos-duration="500"
                data-aos-once="true"
                className="text-3xl text-black sm:text-4xl lg:text-6xl font-bold lg:mt-0"
              >
                Unleash Your Potential at Our Campus Sports Complex!
              </h1>
              <p
                data-aos="zoom-out"
                data-aos-duration="500"
                data-aos-delay="100"
                className="text-base text-black lg:mt-0"
              >
                Discover a vibrant hub for fitness and sports at our Campus
                Sports Complex. With top-notch facilities including fitness
                centers, courts, pools, and tracks, it's the perfect place to
                stay active, connect with others, and achieve your athletic
                goals. Whether you're here to compete or just have fun, our
                complex has everything you need to elevate your game.
              </p>
              <Link to={"/booking"}>
                <button className="relative inline-flex items-center px-12 py-3 overflow-hidden text-md font-medium text-red-900 border-2 border-red-900 rounded-md hover:text-white group hover:bg-gray-50">
                  <span className="absolute left-0 block w-full h-0 transition-all bg-red-900 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                  <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </span>
                  <span className="relative">Book now</span>
                </button>
              </Link>
            </div>
            <div className="mx-auto order-1 sm:order-2">
              <LottieSlideshow />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Hero;
{
  /* <a
href="#_"

>

</a>


p-3 bg-red-900 rounded-lg cursor-pointer font-medium text-white w-40 hover:bg-white hover:border-2 border-red-800 hover:text-red-800 */
}
