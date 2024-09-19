import React from "react";
import "./Hero.css";
import Book from "../../components/Book/Book";
import bImage from "../../assets/background.jpeg";

function Hero() {
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
