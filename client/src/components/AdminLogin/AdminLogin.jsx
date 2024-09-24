import React, { useState, useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom'
import { useAuth } from "../../hooks/authContext";

function AdminLogin() {

  const {getAdminData, isAdmin} = useAuth();


  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmission = async(event)=>{
    try{
        event.preventDefault();
        const response = await fetch("http://localhost:3000/api/auth/adminLogin",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData),
            credentials:'include'
        });
        const data = await response.json();

        if(!response.ok){
            console.log("An error has occured");
            return;
        }

        console.log(data);
        navigate('/admin');

    }
    catch(error){
        console.error(error);
    }
  }

  useEffect(()=>{
    getAdminData();
  },[])

  if(isAdmin){
    navigate('/admin');
    return;
  }

  return (
    <>
      <div className="auth-container login-container">
        <div className="auth-header"> Admin Login</div>
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
        
      </div>
    </>
  );
}

export default AdminLogin;
