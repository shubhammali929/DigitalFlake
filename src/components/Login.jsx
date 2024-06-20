import React, { useState } from 'react';
import digitalflake from '../assets/digitalflake.jpeg';
import { useNavigate } from 'react-router-dom';

function Login({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showResetPopup, setShowResetPopup] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    alert('Password reset email sent to:', resetEmail);
    setShowResetPopup(false);
  };

  return (
    <div className='mainLogin'>
      <div className="loginForm">
        <img src={digitalflake} alt="logo" />
        <p className='welcome'>Welcome to Digitalflake admin</p>
        
        <form onSubmit={handleSubmit}>
          <hr />
          <div className="emailField">
            <label className='emailLabel' htmlFor="email">Email-id</label>
            <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <br />
          <div className="passField">
            <label className='passLabel' htmlFor="pass">Password</label>
            <input type="password" name="pass" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <p className='forgot' onClick={() => setShowResetPopup(true)}>Forgot Password?</p>
          <button type="submit" id='loginButton'>Log In</button>
        </form>
      </div>

      {showResetPopup && (
        <div className='resetPopup'>
          <div className='popupContent'>
            <h3 className="fpLabel1">Did You forget Your Password?</h3>
            <p className="fpLabel2">Enter your email and we will send a reset link to restore password</p>
            <form onSubmit={handleResetPassword} className="fpForm">
              <label htmlFor="resetEmail">Email address</label>
              <input
                type="email"
                name="resetEmail"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />
              <button className="fpButton" type="submit">Request Reset Link</button>
              <p className="fpLable3" onClick={() => setShowResetPopup(false)}>Back to login</p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
