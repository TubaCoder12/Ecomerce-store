import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#FFF7EB] ">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold text-orange-500 mb-4">TravelSite</h3>
          <p className="">
            Explore the world with us! Find amazing destinations, exclusive deals, and create unforgettable memories.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-orange-500 transition">Home</a></li>
            <li><a href="/trips" className="hover:text-orange-500 transition">Trips</a></li>
            <li><a href="/about" className="hover:text-orange-500 transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-orange-500 transition">Contact</a></li>
          </ul>
        </div>

        {/* Destinations */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Popular Destinations</h4>
          <ul className="space-y-2">
            <li><a href="/destinations/maldives" className="hover:text-orange-500 transition">Maldives</a></li>
            <li><a href="/destinations/muree" className="hover:text-orange-500 transition">Muree</a></li>
            <li><a href="/destinations/greece" className="hover:text-orange-500 transition">Greece</a></li>
            <li><a href="/destinations/rome" className="hover:text-orange-500 transition">Rome</a></li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact & Social</h4>
          <p className=" mb-3">Email: support@travelsite.com</p>
          <p className=" mb-3">Phone: +92 300 1234567</p>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-orange-500"><FaFacebookF /></a>
            <a href="#" className="hover:text-orange-500"><FaTwitter /></a>
            <a href="#" className="hover:text-orange-500"><FaInstagram /></a>
            <a href="#" className="hover:text-orange-500"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} TravelSite. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
