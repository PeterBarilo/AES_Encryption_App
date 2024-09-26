import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-left'>
        <h2 className='text'>Encrypt Text with AES</h2>
        <a href="https://github.com/PeterBarilo/AES_Encryption_App" target="_blank" rel="noopener noreferrer" className="git-link">
          Github Repository
        </a>
      </div>
    </div>
  );
};

export default Footer;
