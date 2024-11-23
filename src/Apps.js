import React, { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([...messages, message]);
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className="message">
              {msg}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="input-form">
          <input
            type="text"
            value={message}
            onChange={handleChange}
            placeholder="Type a message..."
            className="input-box"
          />
          <button type="submit" className="submit-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
