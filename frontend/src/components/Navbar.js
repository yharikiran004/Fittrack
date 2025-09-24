import React from 'react';
import './Navbar.css'; // Import the CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Fittrack</div>
      <ul className="navbar-nav">
        <li className="nav-item"><a href="/dashboard" className="nav-link">Dashboard</a></li>
        <li className="nav-item"><a href="/workouts" className="nav-link">Workouts</a></li>
        <li className="nav-item"><a href="/recipe" className="nav-link">Recipes</a></li>
        <li className="nav-item"><a href="/chat" className="nav-link">ChatBot</a></li>
        <li className="nav-item"><a href="/" className="nav-link">Logout</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
