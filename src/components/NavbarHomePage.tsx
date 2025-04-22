import React, { useState } from "react";
import { Link } from "react-router";
import Logo from "../../public/logo.png";
import { FiMenu, FiX } from "react-icons/fi";
import useAuthStore from "../store/useAuthStore";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="w-full">
      <nav className=" text-black p-4 w-full">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <Link to={"/"}>
              <img src={`${Logo}`} alt="Logo" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
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
        </div>
      </nav>

      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden  shadow-lg transition-all duration-300 w-full`}
      >
        <div className="container mx-auto">
          <ul
            className="flex flex-col py-3 px-4 text-center text-gray-700 justify-self-center
"
          >
            {user ? (
              <>
                <li className="py-2 text-center">
                  <Link
                    to="/handymanhomepage"
                    className="text-gray-700 hover:text-gray-400 block"
                  >
                    Search
                  </Link>
                </li>
                <li className="py-2 text-center">
                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-gray-400 block"
                  >
                    Profile
                  </Link>
                </li>
                <li className="py-2 text-center">
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-gray-400 block "
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="py-2 text-center">
                  <Link
                    to="/handymanhomepage"
                    className="text-gray-700 hover:text-gray-400 block"
                  >
                    Search
                  </Link>
                </li>
                <li className="py-2">
                  <Link
                    to="/signup"
                    className="text-gray-700 hover:text-gray-400 block"
                  >
                    Register
                  </Link>
                </li>
                <li className="py-2">
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-gray-400 block"
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
