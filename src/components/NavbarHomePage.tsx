import React, { useState } from "react";
import { Link } from "react-router";
import Logo from "../../public/logo.png";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full">
      <nav className="bg-white text-black p-4 w-full">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <Link to={"/"}>
              <img src={`${Logo}`} alt="Logo" />
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-black focus:outline-none"
            >
              {isOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>

          <div className="hidden md:flex md:items-center">
            <ul className="flex flex-row space-x-6">
              <li>
                <Link to="/Search" className="text-black hover:text-gray-400">
                  Search
                </Link>
              </li>
              <li>
                <Link to="#" className="text-black hover:text-gray-400">
                  Advise
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-black hover:text-gray-400">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-black hover:text-gray-400">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden bg-white shadow-lg transition-all duration-300 w-full`}
      >
        <div className="container mx-auto">
          <ul className="flex flex-col py-3 px-4 text-center text-gray-700 ">
            <li className="py-2">
              <Link
                to="/Search"
                className="text-gray-700  hover:text-gray-400 block"
              >
                Search
              </Link>
            </li>
            <li className="py-2">
              <Link to="#" className="text-gray-700  hover:text-gray-400 block">
                Advise
              </Link>
            </li>
            <li className="py-2">
              <Link
                to="/signup"
                className="text-gray-700  hover:text-gray-400 block"
              >
                Register
              </Link>
            </li>
            <li className="py-2">
              <Link
                to="/login"
                className="text-gray-700  hover:text-gray-400 block"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
