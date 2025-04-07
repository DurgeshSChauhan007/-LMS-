import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row items-center justify-between text-left w-full px-8 py-4 border-t border-gray-400">
      <div className="flex items-center gap-4">
        <img className="hidden md:block w-20" src={assets.logo} alt="Company Logo" />
        <div className="hidden md:block h-7 w-px bg-gray-500/60"></div>
        <p className="text-gray-600 text-sm">Copyright 2025 © Durgesh Singh Chauhan. All Rights Reserved.</p>
      </div>
      <div className='flex items-center gap-3 max-md:mt-0'>
        <a href="#">
          <img src={assets.facebook_icon} alt="facebook_icon" />
        </a>
        <a href="#">
          <img src={assets.twitter_icon} alt="twitter_icon" />
        </a>
        <a href="#">
          <img src={assets.instagram_icon} alt="instagram_icon" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
