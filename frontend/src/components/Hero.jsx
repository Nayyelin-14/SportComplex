import React from "react";
import LottieSlideshow from "./LottieSlideshow";

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
                className="text-3xl text-black sm:text-4xl lg:text-6xl font-bold lg:mt-32"
              >
                Unleash Your Potential at Our Campus Sports Complex!
              </h1>
              <p
                data-aos="zoom-out"
                data-aos-duration="500"
                data-aos-delay="100"
                className="text-sm text-black lg:mt-20"
              >
                Discover a vibrant hub for fitness and sports at our Campus
                Sports Complex. With top-notch facilities including fitness
                centers, courts, pools, and tracks, it's the perfect place to
                stay active, connect with others, and achieve your athletic
                goals. Whether you're here to compete or just have fun, our
                complex has everything you need to elevate your game.
              </p>
              <div>
                <button
                  className="bg-yellow-500 w-40 hover:scale-105 duration-200 text-white py-3 px-4 rounded-full"
                  data-aos="zoom-out"
                  data-aos-duration="500"
                  data-aos-delay="100"
                >
                  Book Now
                </button>
              </div>
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
