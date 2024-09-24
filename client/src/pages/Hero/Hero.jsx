import React, { useState, useEffect } from "react";
import "./Hero.css";
import Book from "../../components/Book/Book";
import bImage from "../../assets/background.jpeg";
import { useAuth } from "../../hooks/authContext";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  const { getUserData, getAdminData, isAdmin } = useAuth();

  // Fetch user data
  useEffect(() => {
    getUserData();
  }, []);

  // Fetch admin data
  useEffect(() => {
    getAdminData();
  }, []);

  // Handle navigation after rendering based on isAdmin status
  useEffect(() => {
    if (isAdmin) {
      navigate("/admin");
    }
  }, [isAdmin, navigate]); // Trigger navigation after `isAdmin` updates

  return (
    <>
      <div className="background-image">
        <figure>
          <img src={bImage} alt="" />
        </figure>
      </div>
      <main className="interaction-part">
        <div className="book-overlay">
          <Book />
        </div>
      </main>
    </>
  );
}

export default Hero;
