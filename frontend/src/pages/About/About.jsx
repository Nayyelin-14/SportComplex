import React from "react";
import bgimage from "../../../mfu.jpg";

const About = () => {
  return (
    <div
      className="w-full h-[100vh] flex flex-col justify-center items-center"
      style={{
        backgroundImage: "url('../../../mfu.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm"></div>
      <div className="z-10 flex flex-col items-center justify-center  sm:px-4 sm:py-8">
        {/* Heading */}
        <h1 className="md:w-[550px] text-center text-3xl  sm:text-4xl md:text-5xl font-bold select-none text-white mb-6">
          About Us
        </h1>

        {/* Paragraphs */}
        <div className="text-white md:w-[550px] text-center space-y-6">
          <p className="leading-relaxed">
            Welcome to the University Sports Complex Booking App! Our platform
            is designed to make it easier for students, faculty, and staff to
            access and reserve the university's sports facilities. Whether
            you're booking a court, field, or gym session, we’ve streamlined the
            process to be quick and hassle-free.
          </p>
          <p className="leading-relaxed">
            In addition to booking features, we provide up-to-date news and
            announcements about sports events, facility schedules, and
            activities happening around the university sports complex. Stay
            connected, stay informed, and make the most of your time on campus
            with our easy-to-use app.
          </p>
          <p className="leading-relaxed">
            Our goal is to ensure everyone can enjoy the sports complex, whether
            for casual recreation or organized events. Thank you for being part
            of our active community!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
