import React, { useState } from "react";
import { MdEvent } from "react-icons/md"; // icon for events
import { HiOutlineClipboardList } from "react-icons/hi"; // for view events
import { FaBars, FaTimes, FaChevronDown, FaChevronRight, FaMoon } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState("");

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? "" : dropdown);
  };

  return (
    <div className="flex">
      <nav className={`${isOpen ? "w-60" : "w-20"} bg-gray-800 text-white shadow-xl transition-all duration-500`}>
        {/* Sidebar Header */}
        <div className="py-5 px-6 text-lg font-semibold flex items-center justify-between border-b border-white">
          {isOpen ? (
            <>
              <button onClick={toggleSidebar} className="text-black hover:text-gray-100">
                <FaTimes className="text-white" />
              </button>
              <span className="ml-2 text-xl">Dashboard</span>
              <FaMoon className="ml-2 text-gray-400 hover:text-gray-100 cursor-pointer" />
            </>
          ) : (
            <div className="flex items-center justify-center w-full">
              <FaBars onClick={toggleSidebar} className="text-gray-400 hover:text-gray-100 cursor-pointer" />
              <FaMoon className="ml-2 text-gray-400 hover:text-gray-100 cursor-pointer" />
            </div>
          )}
        </div>

        {/* Sidebar Menu */}
        <ul className="mt-4">
          {/* Events Dropdown */}
          <li
            className="group flex items-center px-6 py-4 hover:text-green-500 rounded-md cursor-pointer"
            onClick={() => toggleDropdown("events")}
          >
            <MdEvent className={`${isOpen ? "mr-3" : ""}`} />
            {isOpen && <span>Events</span>}
            {isOpen &&
              (activeDropdown === "events" ? (
                <FaChevronDown className="ml-auto" />
              ) : (
                <FaChevronRight className="ml-auto" />
              ))}
          </li>

          {/* Events Dropdown Menu */}
          {activeDropdown === "events" && (
            <ul className="pl-10 text-white">
              <li className="flex items-center cursor-pointer p-2 hover:text-green-500 rounded-md transition-colors w-44">
                <MdEvent className="mr-2" />
                {isOpen && (
                  <span>
                    <Link to="/event/add">Add New Event</Link>
                  </span>
                )}
              </li>
              <li className="flex items-center cursor-pointer p-2 hover:text-green-500 rounded-md transition-colors w-44">
                <HiOutlineClipboardList className="mr-2" />
                {isOpen && (
                  <span>
                    <Link to="/event/view">View Events</Link>
                  </span>
                )}
              </li>
            </ul>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
