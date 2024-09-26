import React from 'react';
import './Nav.css';
import { assets } from '../assets/assets';

const Nav = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div className='nav'>
      <div className="nav-left">
        <img className='imglogo' src={assets.logo} alt="" />
        <h2 className="logo">AES Encrypt Online</h2>
      </div>
      
      <div className='nav-right'>
        <img
          src={isDarkMode ? assets.light : assets.dark}
          alt="Toggle Dark Mode"
          onClick={toggleDarkMode}
          className="dark-mode-icon"
        />
      </div>
    </div>
  );
};

export default Nav;
