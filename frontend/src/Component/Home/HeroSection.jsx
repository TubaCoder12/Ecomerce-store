import React from "react";
import img from "../../../public/images/img-girl.png";

const HeroSection = () => {
  return (
    <section className="relative bg-[#FFF7EB] min-h-[90vh] md:min-h-[45vh] lg:min-h-[50vh] flex items-center py-16 md:py-10 sm:py-16   ">
      {/* ✅ sm: flex-col (text → image)  |  md+: flex-row */}
      <div className="container mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-12">

        {/* ✅ Text First Always */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <p className="text-orange-500 font-semibold uppercase mb-3 font-poppins text-sm sm:text-base md:text-lg">
            Best destinations around the world
          </p>

          <h1 className="font-volkhov font-bold leading-tight text-4xl sm:text-5xl md:text-5xl lg:text-7xl xl:text-8xl">
            Travel, <span className="text-orange-500">enjoy</span> and live a new
            and full life
          </h1>

          <p className="text-gray-600 mt-4 mb-6 text-base text-lg  leading-relaxed">
            Built Wicket longer admire do barton vanity itself do in it.
            Preferred to sportsmen engrossed listening. Park gate sell they west hard for the.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition font-medium">
              Find out more
            </button>
            <button className="flex items-center justify-center gap-2 border border-gray-300 px-6 py-3 rounded-md hover:bg-gray-100 transition font-medium">
              <span className="w-4 h-4 bg-orange-500 rounded-full"></span>
              Play Demo
            </button>
          </div>
        </div>

        {/* ✅ Image Always After Text on sm */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <img
            src={img}
            alt="Traveler"
            className=" object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
