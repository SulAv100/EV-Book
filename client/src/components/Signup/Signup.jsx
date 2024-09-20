import React, { useState } from "react";
import "./signup.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Link , useNavigate} from "react-router-dom";

// creating an schema to check the validaity of the data of form
const signupScheme = z
  .object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    phoneNumber: z
      .string()
      .min(10, "Phone Number must be at least 10 digits long"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

function Signup() {

  const navigate = useNavigate();
  // this is react-form-hook that simplifies form submission
  // It takes 3 thing
  //register which is used to store data handleSubmit is used to submit the form acts as a firewall
  // errors is to dipslay error when the scheme condition isnt fulfilles
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupScheme),
  });

  const handleSignup = async (formData) => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials:'include'
      });
      const data = await response.json();
      if (!response.ok) {
        console.log("An unexpected error has occured");
        return;
      }
      navigate('/');                                                                
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-container signup-container">
      <div className="auth-header">Sign Up</div>
      <form className="auth-form" onSubmit={handleSubmit(handleSignup)}>
        <label htmlFor="first-name">First Name</label>
        <input type="text" {...register("firstName")} required />
        {errors.firstName && <span>{errors.firstName.message}</span>}

        <label htmlFor="last-name">Last Name</label>
        <input type="text" {...register("lastName")} required />
        {errors.lastName && <span>{errors.lastName.message}</span>}

        <label htmlFor="phone-number">Phone Number</label>
        <input type="text" {...register("phoneNumber")} required />
        {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}

        <label htmlFor="signup-password">Password</label>
        <input type="password" {...register("password")} required />
        {errors.password && <span>{errors.password.message}</span>}

        <label htmlFor="confirm-password">Confirm Password</label>
        <input type="password" {...register("confirmPassword")} required />
        {errors.confirmPassword && (
          <span>{errors.confirmPassword.message}</span>
        )}

        <button type="submit" className="auth-button">
          Sign Up
        </button>
      </form>
      <div className="auth-switch">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Signup;
