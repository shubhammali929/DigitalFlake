import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleLogin = (email, password) => {
    if (email === 'admin@gmail.com' && password === 'admin') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid email or password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="app">
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes>
          {/* Default route */}
          <Route path="/" element={!isLoggedIn ? <Login handleLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
          {/* Dashboard route */}
          <Route path="/dashboard/*" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
