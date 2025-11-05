import React from "react";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="h-screen w-full flex flex-col justify-center items-center bg-[#FFF7EB] p-6 relative overflow-hidden">
        <div className=""></div>

        <h1 className="text-orange-500 text-6xl font-extrabold tracking-wide mb-4 shadow-lg animate-shimmer">
          Welcome to Travel Site
        </h1>

        <h2 className="text-black text-2xl italic mb-8 animate-fadeIn delay-200"></h2>

        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-xl border border-gray-300 text-center max-w-md animate-fadeIn delay-300">
          <p className="text-lg  font-semibold">
            Please select a section from the sidebar
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
