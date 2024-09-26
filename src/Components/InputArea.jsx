import React, { useState } from 'react';
import './InputArea.css';

const InputArea = () => {
  const [text, setText] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleEncrypt = () => {
    console.log('Encrypting:', text);
    // Add logic to send this text to the Python backend
  };

  return (
    <div className='input-container'>
      <h2>Enter Text to Encrypt</h2>
      <textarea
        name="textIn"
        rows="10"
        cols="60"
        placeholder="Type your text here..."
        value={text}
        onChange={handleTextChange}
      />
      <div className='encryptButton'>
        <button onClick={handleEncrypt}>Encrypt Text</button>
      </div>
    </div>
  );
};

export default InputArea;
