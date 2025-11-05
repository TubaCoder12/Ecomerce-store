import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../app/Redux/AuthSlice";
import { API, api } from "../../ApiRoute/ApiRoute";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      await api.delete(API.LOGOUT, {});
      dispatch(Logout());
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="bg-[#FFF7EB] shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold font-volkhov text-orange-500 tracking-tight"
          >
            TravelSite
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
            <Link to="/" className="hover:text-orange-500 transition">
              Home
            </Link>
            <Link to="/about" className="hover:text-orange-500 transition">
              About
            </Link>
            <Link to="/services" className="hover:text-orange-500 transition">
              Services
            </Link>
            <Link to="/contact" className="hover:text-orange-500 transition">
              Contact
            </Link>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-5">
            {!user ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="py-2 px-5 border border-orange-500 text-orange-500 rounded-lg font-medium hover:bg-orange-500 hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="py-2 px-5 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3 relative">
                <Link
                  to="/dashboard"
                  className="py-2 px-5 bg-orange-100 text-orange-600 font-medium rounded-lg hover:bg-orange-200 transition"
                >
                  Dashboard
                </Link>

                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-orange-500 text-white font-bold focus:outline-none hover:bg-orange-600"
                  >
                    {user?.email?.charAt(0).toUpperCase()}
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg overflow-hidden">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500 font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <FaTimes className="h-6 w-6 text-gray-700" />
              ) : (
                <FaBars className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#FFF7EB] shadow-md border-t">
          <div className="px-4 pt-3 pb-5 space-y-3 text-gray-700 font-medium">
            <Link
              to="/"
              className="block py-2 hover:text-orange-500 transition"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block py-2 hover:text-orange-500 transition"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/services"
              className="block py-2 hover:text-orange-500 transition"
              onClick={() => setMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="block py-2 hover:text-orange-500 transition"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>

            {!user ? (
              <div className="flex flex-col gap-2 pt-3">
                <Link
                  to="/login"
                  className="block py-2 text-center border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block py-2 text-center bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="block py-2 hover:text-orange-500 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left py-2 text-red-500 hover:bg-gray-100 rounded-md transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
