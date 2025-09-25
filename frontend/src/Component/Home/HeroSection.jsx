import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white py-20">
      <div className="container mx-auto text-center px-6">
        <h1 className="text-5xl font-bold mb-4">Welcome to My Store</h1>
        <p className="text-lg mb-6">
          Shop the latest products with amazing discounts 
        </p>
        <button className="px-6 py-3 bg-black rounded-full text-white hover:bg-gray-800 transition">
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
