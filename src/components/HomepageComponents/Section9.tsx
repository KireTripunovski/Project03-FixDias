import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import logo from "../../../public/logo.png";
const Footer = () => {
  return (
    <footer className=" mt-15">
      <div className="container mx-auto text-center py-5">
        <div className="flex justify-between mx-15 items-center mb-4">
          <img src={logo} alt="logo" />{" "}
          <h2 className="text-lg font-bold">My craftsman</h2>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center text-gray-600 mb-6">
          <span>Loremic</span>
          <span>Loremic</span>
          <span>Loremic</span>
          <span>Loremic</span>
          <span>Loremic</span>
        </div>

        <div className="flex justify-center space-x-4 mb-4">
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <FaFacebookF />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <FaTwitter />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <FaInstagram />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <FaLinkedinIn />
          </a>
        </div>

        <p className="text-gray-500 text-sm">
          Copyright © 2024 Mein Hausmaister. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
