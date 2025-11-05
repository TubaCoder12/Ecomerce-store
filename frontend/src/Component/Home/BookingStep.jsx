import React from "react";
import {
  FaMapMarkerAlt,
  FaCreditCard,
  FaPlaneDeparture,
} from "react-icons/fa";

const BookingStep = () => {
  return (
    <section className="bg-[#FFF7EB] py-20">
      <div className="container mx-auto px-6 md:px-8 flex flex-col lg:flex-row items-center justify-between gap-16">
        {/* Left Section */}
        <div className="w-full lg:w-1/2">
          <p className="text-orange-500 font-semibold uppercase tracking-wide text-sm font-poppins">
            Easy & Fast
          </p>
          <h2 className="text-[32px] md:text-[48px] lg:text-6xl font-volkhov font-bold text-gray-900 mt-2 mb-12 leading-tight">
            Book Your Next Trip <br /> In 3 Easy Steps
          </h2>

          {/* Steps */}
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex items-start space-x-4">
              <div className="bg-orange-500 text-white p-4 rounded-xl shadow-md">
                <FaMapMarkerAlt size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">
                  Choose Destination
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Select your dream destination from our wide range of travel
                  locations around the world.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start space-x-4">
              <div className="bg-red-400 text-white p-4 rounded-xl shadow-md">
                <FaCreditCard size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">
                  Make Payment
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Complete your booking quickly and securely using our trusted
                  payment methods.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start space-x-4">
              <div className="bg-blue-900 text-white p-4 rounded-xl shadow-md">
                <FaPlaneDeparture size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">
                  Reach Airport on Selected Date
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Pack your bags and head to the airport — your adventure awaits!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section (Trip Card) */}
        <div className="relative w-full lg:w-auto flex justify-center lg:justify-end">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-80 md:w-96">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
              alt="Trip to Greece"
              className="h-52 w-full object-cover"
            />
            <div className="p-5">
              <h3 className="font-bold text-gray-800 text-lg">
                Trip To Greece
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                14–29 June | by Robbin Joe
              </p>
              <div className="flex items-center justify-between text-gray-500 text-sm mb-3">
                <span>📍 Greece</span>
                <span>✈️ Air</span>
                <span>📷 Tour</span>
              </div>
              <p className="text-sm text-gray-500">24 people going</p>
            </div>
          </div>

         
        </div>
      </div>
    </section>
  );
};

export default BookingStep;
