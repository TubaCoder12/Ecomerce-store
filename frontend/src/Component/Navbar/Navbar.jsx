import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaUser,
  FaHome,
  FaInfoCircle,
  FaBriefcase,
  FaPhone,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../app/Redux/AuthSlice";
import { API, api } from "../../ApiRoute/ApiRoute";

const Navbar = () => {
  const handleLogout = async () => {
    try {
      await api.post(API.LOGOUT, {});
      dispatch(Logout());
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  const auth = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const role = user?.role;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-orange-500">
            MyBrand
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link
              to="/"
              className="flex items-center gap-1 hover:text-orange-500"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="flex items-center gap-1 hover:text-orange-500"
            >
              About
            </Link>
            <Link
              to="/services"
              className="flex items-center gap-1 hover:text-orange-500"
            >
              Services
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart Icon */}
            <div className="relative">
              <FaShoppingCart className="h-6 w-6 cursor-pointer hover:text-orange-500" />
              {/* <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-1">
                3
              </span> */}
            </div>

            {!auth ? (
              <Link
                to="/login"
                className="flex items-center py-2 px-8 bg-orange-500 text-white rounded-[12px]"
              >
                Login
              </Link>
            ) : (
              <div className="relative group">
                {/* Avatar (email ka first letter) */}
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-orange-500 text-white font-bold cursor-pointer">
                  {auth?.email?.charAt(0).toUpperCase()}
                </div>

                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 transition">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  {role == "admin" ? (
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                  ) : (
                    ""
                  )}

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
