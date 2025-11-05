import React from "react";
import HeroSection from "./HeroSection";
import FeatureProduct from "./FeatureEventHome";
import Chatbot from "../Chatbot/Chatbot";
import BookingStep from "./BookingStep";

const Home = () => {
  return (
    <>
      <HeroSection />
      <BookingStep/>
      <FeatureProduct />
      <Chatbot/>
    </>
  );
};

export default Home;
