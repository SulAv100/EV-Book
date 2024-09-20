import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });


  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmission = async (event) => {
    try {
      event.preventDefault();
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) {
        console.log("An error has occured");
        return;
      }
      navigate('/');
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-container login-container">
      <div className="auth-header">Login</div>
      <form className="auth-form">
        <label htmlFor="login-number">Phone Number</label>
        <input
          type="tel"
          onChange={(event) => handleChange(event)}
          value={formData.loginNumber}
          name="phoneNumber"
          required
        />

        <label htmlFor="login-password">Password</label>
        <input
          type="password"
          onChange={(event) => handleChange(event)}
          value={formData.password}
          name="password"
          required
        />

        <button onClick={handleSubmission} className="auth-button">
          Login
        </button>
      </form>
      <div className="auth-switch">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}

export default Login;
