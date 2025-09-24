import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './signup.css'; // Import the CSS file for styling

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/auth/users/', {
        username,
        email,
        password
      });
      navigate('/login'); // Redirect to the login page
    } catch (err) {
      setError('Failed to sign up');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-image">
        <img src="/AuthImage.jpg" alt="Fitness" />
      </div>
      <div className="signup-form">
        <h2>Sign Up for Fittrack <span role="img" aria-label="wave">👋</span></h2>
        <p>Please enter your details to create an account</p>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <p className="login-link">Already have an account? <a href="/login">Log in</a></p>
      </div>
    </div>
  );
};

export default Signup;
