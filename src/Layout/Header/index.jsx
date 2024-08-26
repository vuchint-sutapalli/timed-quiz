import React from "react";
import LogoutBtn from "./LogoutBtn";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../../Atoms";
import logo from "./logo.png";

const Header = () => {
  const authStatus = useRecoilValue(authState)?.status;

  const navItems = [
    {
      name: "Home",
      navTo: "/",
      active: true,
    },
    {
      name: "Login",
      navTo: "/login",
      active: !authStatus,
    },
  ];

  return (
    <header className="flex flex-shrink-0 items-center justify-between p-4 bg-gray-800 text-white shadow-lg">
      <div className="flex items-center space-x-4">
        <Link to="/" className="flex items-center space-x-2">
          <img className="w-10 h-10" src={logo} alt="quizzo" />
          <span className="text-2xl h-10 font-semibold tracking-wide">
            Quizzo
          </span>
        </Link>
      </div>
      <nav className="hidden md:flex md:space-x-8">
        <ul className="flex space-x-8">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.navTo}
                className={`text-lg font-medium transition-colors duration-300 ${
                  item.active ? "text-blue-500" : "text-gray-300"
                } hover:text-blue-400`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {authStatus && (
        <div className="md:flex md:items-center">
          <LogoutBtn />
        </div>
      )}
      <div className="md:hidden">
        {/* Add a mobile menu icon here if needed */}
      </div>
    </header>
  );
};

export default Header;
