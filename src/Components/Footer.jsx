import React from 'react';
import './Footer.css';

const Footer = ({ isDarkMode }) => {
  return (
    <div className={`footer ${isDarkMode ? 'dark' : 'light'}`}>
      <div className='footer-left'>
          <h2>Advanced Encryption Standard </h2>
          <a href="https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.197-upd1.pdf" target="_blank" rel="noopener noreferrer">About AES</a>
          <a href="https://pypi.org/project/pycryptodome/" target="_blank" rel="noopener noreferrer">PyCryptoDome Docs</a>

        </div>
        <div className='footer-right'>
          <h2>Project Links</h2>
          <a href="https://github.com/PeterBarilo/AES_Encryption_App" target="_blank" rel="noopener noreferrer" className="git-link">
            Github Repository
          </a>
          <a href="https://github.com/PeterBarilo" target="_blank" rel="noopener noreferrer" className="git-link">
            Created By
          </a>
        </div>
    </div>
  );
};

export default Footer;
