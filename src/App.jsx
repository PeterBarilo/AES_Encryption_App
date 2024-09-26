import React, { useState, useEffect } from 'react';
import InputArea from './Components/InputArea';
import Footer from './Components/Footer';
import Nav from './Components/Nav';
import './App.css';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    document.body.classList.add('dark-mode');
  }, []); 

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  };

  return (
    <div className='app'>
      <Nav isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <div className="main-content">
        <InputArea isDarkMode={isDarkMode} />
      </div>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default App;
