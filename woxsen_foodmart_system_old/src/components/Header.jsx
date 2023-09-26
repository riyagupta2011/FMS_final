import React, { useState } from "react";
import "./Header.css";
import menu from "./menu.svg";
import logo from "./logo.png";

const Header = ({ isLoggedIn, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header>
      <nav className={`header__nav ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        <div className="header__logo">
          <img src={logo} alt="Logo" />
        </div>

        <ul className={`header__menu ${mobileMenuOpen ? 'mobile-menu' : ''}`}>
          <li>
            <a href="#food">Menu</a>
          </li>
          <li>
            <a href="#about">About Us</a>
          </li>
          <li>
            <a href="#food-selection">Selected Food</a>
          </li>
          {isLoggedIn && (
            <li>
              <button className="logout-button" onClick={onLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>

        <ul className="header__menu-mobile" data-aos="fade-down">
          <li>
            <img src={menu} alt="menu" onClick={toggleMobileMenu} />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;


