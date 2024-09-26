import React, { useState } from 'react';
import './InputArea.css';
import axios from 'axios';
import { assets } from '../assets/assets';

const InputArea = ({ isDarkMode }) => {
  const [text, setText] = useState('');
  const [encryptedData, setEncryptedData] = useState(null);
  const [decryptedText, setDecryptedText] = useState(null);
  const [showAlert, setShowAlert] = useState(false); // State for custom alert


  const handleTextChange = (e) => {
    setText(e.target.value);
    setShowAlert(false); 
  };
  const handleEncrypt = async () => {
    if (!text.trim()) {  
      setShowAlert(true); 
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/encrypt', { message: text });
      setEncryptedData(response.data);
    } catch (error) {
      console.error('Error encrypting message:', error);
    }
  };

  const handleDecrypt = async () => {
    if (encryptedData) {
      try {
        const response = await axios.post('http://localhost:5000/decrypt', encryptedData);
        setDecryptedText(response.data.plaintext);
      } catch (error) {
        console.error('Error decrypting message:', error);
      }
    }
  };

  const handleDownload = () => {
    if (encryptedData) {
      const fileContent = `
        Ciphertext: ${encryptedData.ciphertext}
        Nonce: ${encryptedData.nonce}
        Tag: ${encryptedData.tag}
      `;

      const blob = new Blob([fileContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'encrypted_data.txt';
      document.body.appendChild(a);
      a.click();

      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  };

  const handleOpenInNewTab = () => {
    if (encryptedData) {
      const newTab = window.open();
      newTab.document.write(`<pre>${encryptedData.ciphertext}</pre>`);
      newTab.document.close();
    }
  };

  return (
    <div className={`input-container ${isDarkMode ? 'dark' : 'light'}`}>
      <h2>Enter Text to Encrypt</h2>
      <textarea
        name="textIn"
        rows="10"
        cols="60"
        placeholder="Type your text here..."
        value={text}
        onChange={handleTextChange}
      />
      <div className="lines-shoot-up"></div>
      {showAlert && <p className="alert">Please enter text to encrypt.</p>} 
      <div className="encryptButton">
        <button onClick={handleEncrypt}>Encrypt Text</button>
      </div>

      {encryptedData && (
        <div className="encrypted-data">
          <h3>Encrypted Data:</h3>
          <p><strong>Ciphertext:</strong> {encryptedData.ciphertext.slice(0, 10)}...<button className='opentab' onClick={handleOpenInNewTab}>Open Full Ciphertext<img className='new'src={assets.new_light} alt="" /></button> </p>
          
          <p>Nonce: {encryptedData.nonce}</p>
          <p>Tag: {encryptedData.tag}</p>
          <div className='buttons'>
            <button onClick={handleDecrypt}>Decrypt Text</button>
            <button className="download-btn" onClick={handleDownload}>Download as .txt</button>
          </div>
          
        </div>
      )}

      {decryptedText && (
        <div className="decrypted-text">
          <h3>Decrypted Text:</h3>
          <p>{decryptedText}</p>
        </div>
      )}
    </div>
  );
};

export default InputArea;
