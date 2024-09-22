import React, { useState, useEffect } from "react";
import "./Hero.css";
import Book from "../../components/Book/Book";
import bImage from "../../assets/background.jpeg";
import { useAuth } from "../../hooks/authContext";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  const { getUserData, getAdminData, isAdmin } = useAuth();

  useEffect(() => {
    getUserData();
  }, []);
  useEffect(()=>{
    getAdminData();

  },[isAdmin])

  if (isAdmin) {
    navigate("/adminLanding");
  }

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
