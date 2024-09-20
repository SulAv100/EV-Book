import React,{useState,useEffect} from "react";
import "./Hero.css";
import Book from "../../components/Book/Book";
import bImage from "../../assets/background.jpeg";
import { useAuth } from "../../hooks/authContext";

function Hero() {

  const {getUserData} = useAuth();


  useEffect(()=>{
    getUserData();
  },[])

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
