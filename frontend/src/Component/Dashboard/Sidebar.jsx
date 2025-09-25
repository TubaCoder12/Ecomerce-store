import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaKey,
  FaChevronDown,
  FaChevronRight,
  FaMoon,
  FaUserAlt,
} from "react-icons/fa";
import { TbSettingsDollar } from "react-icons/tb";
import { MdProductionQuantityLimits } from "react-icons/md";
import { HiShoppingBag } from "react-icons/hi";
import { RiShoppingBag3Line } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { ImUpload3 } from "react-icons/im";
import { IoCloudUpload } from "react-icons/io5";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import { GrFormViewHide } from "react-icons/gr";
import { FaUsersViewfinder } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Sidebar = ({ isAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState("");

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? "" : dropdown);
  };

  return (
    <div className="flex">
      <nav
        className={` ${
          isOpen ? "w-60" : "w-20"
        } bg-gray-800 text-white shadow-xl transition-all duration-500`}
      >
        <div className="py-5 px-6 text-lg font-semibold flex items-center justify-between border-b border-white">
          {isOpen ? (
            <>
              <button
                onClick={toggleSidebar}
                className="text-black hover:text-gray-100"
              >
                <FaTimes className="text-white" />
              </button>
              <span className="ml-2 text-xl"> Dashboard</span>
              <FaMoon className="ml-2 text-gray-400 hover:text-gray-100 cursor-pointer" />
            </>
          ) : (
            <div className="flex items-center justify-center w-full">
              <FaBars
                onClick={toggleSidebar}
                className="text-gray-400 hover:text-gray-100 cursor-pointer"
              />
              <FaMoon className="ml-2 text-gray-400 hover:text-gray-100 cursor-pointer" />
            </div>
          )}
        </div>

        <ul className="mt-4">
          {/* Settings Dropdown  */}
          <li
            className="group flex items-center px-6 py-4 hover:text-green-500 rounded-md cursor-pointer"
            onClick={() => toggleDropdown("settings")}
          >
            <TbSettingsDollar className={`${isOpen ? "mr-3" : ""}`} />
            {isOpen && <span>Settings</span>}
            {isOpen &&
              (activeDropdown === "settings" ? (
                <FaChevronDown className="ml-auto" />
              ) : (
                <FaChevronRight className="ml-auto" />
              ))}
          </li>

          {/* Settings Dropdown Menu */}
          {activeDropdown === "settings" && (
            <ul className="pl-10 text-white">
              <li
                className="flex items-center cursor-pointer p-2 hover:text-green-500 rounded-md transition-colors w-44 space-x-2"
                onClick={() => {}}
              >
                <CgProfile className="mr-2" />
                {isOpen && (
                  <span>
                    <Link to="/profile"> View Profile</Link>
                  </span>
                )}
              </li>
              <li
                className="flex items-center cursor-pointer p-2 hover:text-green-500 rounded-md transition-colors w-44"
                onClick={() => {}}
              >
                <ImUpload3 className="mr-2" />
                {isOpen && (
                  <span>
                    <Link to="/UpdateProfile">Update Profile</Link>
                  </span>
                )}
              </li>
              <li
                className="flex items-center cursor-pointer p-2 hover:text-green-500 rounded-md transition-colors w-44"
                onClick={() => {}}
              >
                <IoCloudUpload className="mr-2" />
                {isOpen && <span>Upload Image</span>}
              </li>
              <li
                className="flex items-center cursor-pointer p-2 hover:text-green-500 rounded-md transition-colors w-44"
                onClick={() => {}}
              >
                <FaKey className="mr-2" />
                {isOpen && (
                  <span>
                    <Link to="/ChangePassword"> Change Password</Link>
                  </span>
                )}
              </li>
            </ul>
          )}

          {/* Products Dropdown */}

          <>
            {" "}
            <li
              className="group flex items-center px-6 py-4 hover:text-green-500 rounded-md cursor-pointer"
              onClick={() => toggleDropdown("products")}
            >
              <MdProductionQuantityLimits
                className={`${isOpen ? "mr-3" : ""}`}
              />
              {isOpen && <span>Products</span>}
              {isOpen &&
                (activeDropdown === "products" ? (
                  <FaChevronDown className="ml-auto" />
                ) : (
                  <FaChevronRight className="ml-auto" />
                ))}
            </li>
            {/* Products Dropdown Menu */}
            {activeDropdown === "products" && (
              <ul className="pl-10 text-white">
                <li
                  className="flex items-center cursor-pointer p-2 hover:text-green-500 rounded-md transition-colors w-44"
                  onClick={() => {}}
                >
                  <MdProductionQuantityLimits className="mr-2" />
                  {isOpen && (
                    <span>
                      <Link to="/product/add">Add New Product</Link>
                    </span>
                  )}
                </li>
                <li
                  className="flex items-center cursor-pointer p-2 hover:text-green-500 rounded-md transition-colors w-44"
                  onClick={() => {}}
                >
                  <HiShoppingBag className="mr-2" />
                  {isOpen && (
                    <span>
                      <Link to="/product/view">View Products</Link>
                    </span>
                  )}
                </li>
              </ul>
            )}
          </>

          {/* Orders Dropdown */}
          <li
            className="group flex items-center px-6 py-4 hover:text-green-500 rounded-md cursor-pointer"
            onClick={() => toggleDropdown("orders")}
          >
            <RiShoppingBag3Line className={`${isOpen ? "mr-3" : ""}`} />
            {isOpen && <span>Orders</span>}
            {isOpen &&
              (activeDropdown === "orders" ? (
                <FaChevronDown className="ml-auto" />
              ) : (
                <FaChevronRight className="ml-auto" />
              ))}
          </li>

          {/* Orders Dropdown Menu */}
          {activeDropdown === "orders" && (
            <ul className="pl-10 text-white">
              <li
                className="flex items-center cursor-pointer p-2 hover:text-green-500 rounded-md transition-colors w-44"
                onClick={() => {}}
              >
                <AiOutlineDeliveredProcedure className="mr-2" />
                {isOpen && <span>Delivered Orders</span>}
              </li>
              <li
                className="flex items-center cursor-pointer p-2 hover:text-green-500 rounded-md transition-colors w-44"
                onClick={() => {}}
              >
                <GrFormViewHide className="mr-2" />
                {isOpen && <span>View Orders</span>}
              </li>
            </ul>
          )}

          <>
            {" "}
            <li
              className="group flex items-center px-6 py-4 hover:text-green-500 rounded-md cursor-pointer"
              onClick={() => toggleDropdown("users")}
            >
              <FaUserAlt className={`${isOpen ? "mr-3" : ""}`} />
              {isOpen && <span>Users</span>}
              {isOpen &&
                (activeDropdown === "users" ? (
                  <FaChevronDown className="ml-auto" />
                ) : (
                  <FaChevronRight className="ml-auto" />
                ))}
            </li>
            {activeDropdown === "users" && (
              <ul className="pl-10 text-white">
                <li
                  className="flex items-center cursor-pointer p-2 hover:text-green-500 rounded-md transition-colors w-44"
                  onClick={() => {}}
                >
                  <FaUsersViewfinder className="mr-2" />
                  {isOpen && <span>View Users</span>}
                </li>
              </ul>
            )}
          </>

          {/* Users Dropdown */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
