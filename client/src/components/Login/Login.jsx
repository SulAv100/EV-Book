import React from 'react';
import './login.css'; // Ensure this file is correctly linked to your component
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="auth-container login-container">
      <div className="auth-header">Login</div>
      <form className="auth-form">
        <label htmlFor="login-number">Phone Number</label>
        <input type="tel" id="login-number" name="login-number" required />

        <label htmlFor="login-password">Password</label>
        <input type="password" id="login-password" name="login-password" required />

        <button type="submit" className="auth-button">Login</button>
      </form>
      <div className="auth-switch">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}

export default Login;
