import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = { role: 'user', content: input };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE5MjE4MjkyLCJpYXQiOjE3MTkyMTQ2OTIsImp0aSI6Ijg1OTM1YjU3N2YyOTQ4NjZhMGJkOTIyY2JjYzJkMDgwIiwidXNlcl9pZCI6Mn0.Lgzi71NM3vX-yi5ULkyzxq50Ki26QeJbAJhHtY5GL2I"; // Replace with your actual token

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/chat/',
        { message: input },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      const botMessageContent = response.data.response; // Check the response structure
      const botMessage = { role: 'bot', content: botMessageContent.join('\n') };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { role: 'bot', content: 'Sorry, there was an error processing your request.' };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    }

    setInput('');
  };

  return (
    <div>
      <Navbar /> 
      <div style={styles.chatbotContainer}>
        <div style={styles.chatbotHeader}>
          <h1 style={styles.headerText}>Recipe Chatbot</h1>
        </div>
        <div style={styles.chatbotMessages}>
          {messages.map((msg, index) => (
            <div key={index} style={msg.role === 'user' ? styles.userMessage : styles.botMessage}>
              <strong>{msg.role === 'user' ? 'You' : 'Bot'}:</strong> {msg.content}
            </div>
          ))}
        </div>
        <div style={styles.chatbotInputContainer}>
          <input
            type="text"
            style={styles.chatbotInput}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message here..."
          />
          <button style={styles.chatbotSendButton} onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  chatbotContainer: {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
  },
  chatbotHeader: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px',
    borderRadius: '10px 10px 0 0',
    textAlign: 'center',
  },
  headerText: {
    margin: 0,
  },
  chatbotMessages: {
    border: '1px solid #ccc',
    padding: '10px',
    height: '300px',
    overflowY: 'scroll',
  },
  userMessage: {
    textAlign: 'right',
    backgroundColor: '#d1ecf1',
    padding: '10px',
    borderRadius: '10px',
    margin: '5px 0',
  },
  botMessage: {
    textAlign: 'left',
    backgroundColor: '#fff3cd',
    padding: '10px',
    borderRadius: '10px',
    margin: '5px 0',
  },
  chatbotInputContainer: {
    display: 'flex',
    marginTop: '10px',
  },
  chatbotInput: {
    flex: 1,
    padding: '10px',
    borderRadius: '10px',
    border: '1px solid #ccc',
  },
  chatbotSendButton: {
    padding: '10px 20px',
    marginLeft: '10px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
  }
};

export default Chatbot;
