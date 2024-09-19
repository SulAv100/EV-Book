import React from 'react';
import './signup.css'; // Ensure this file is correctly linked to your component
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div className="auth-container signup-container">
      <div className="auth-header">Sign Up</div>
      <form className="auth-form">
        <label htmlFor="first-name">First Name</label>
        <input type="text" id="first-name" name="first-name" required />

        <label htmlFor="last-name">Last Name</label>
        <input type="text" id="last-name" name="last-name" required />

        <label htmlFor="phone-number">Phone Number</label>
        <input type="tel" id="phone-number" name="phone-number" required />

        <label htmlFor="signup-password">Password</label>
        <input type="password" id="signup-password" name="signup-password" required />

        <label htmlFor="confirm-password">Confirm Password</label>
        <input type="password" id="confirm-password" name="confirm-password" required />

        <button type="submit" className="auth-button">Sign Up</button>
      </form>
      <div className="auth-switch">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Signup;
