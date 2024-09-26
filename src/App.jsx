import React from 'react';
import InputArea from './Components/InputArea';
import Footer from './Components/Footer';
import Nav from './Components/Nav';
import './App.css';

const App = () => {
  return (
    <div className='app'>
      <Nav />
      <div className="main-content">
        <InputArea />
      </div>
      <Footer />
    </div>
  );
};

export default App;
