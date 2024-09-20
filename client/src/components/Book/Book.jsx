import React from "react";
import "./Book.css";
import Van from "../../assets/van.jpg";

function Book() {
  return (
    <section className="booking-part">
      <h1>Devghat, Town Chowk To Kathmandu, Kalanki</h1>
      <div className="upper-section">
        <div className="upper-sub">
          <span>Devghat Town chowk --- Kathmandu Talanki</span>
          <span>September 21, 2024</span>
        </div>
        <div className="book-section">
          <figure>
            <img src={Van} alt="" />
          </figure>
          <div className="location">
            <span>
              <p>Devghat to</p>
              <p>Kathmandu</p>
            </span>
            <span>
              <p>BA 1 Kha 9606</p>
            </span>
          </div>
          <div className="time">
            <div>
              <i class="fa-solid fa-location-pin"></i>
              <p>Devghat Town Chowk (5:00 am)</p>
            </div>
            <div>
              <i class="fa-solid fa-location-dot"></i>{" "}
              <p>Kathmandu Kalanki (12:00 pm)</p>
            </div>
          </div>
          <div className="type">
            <span>Devghat Micro</span>
            <span>Coach Type</span>
          </div>
          <div className="price">
            <p>Rs.600</p>
            <p>Fare/Seat</p>
          </div>
          <button className="seat-btn">View Seat</button>
        </div>
      </div>
      <div className="lower-section">
        <div className="upper-sub">
          <span>Kathmandu Kalanki --- Devghat Town Hall</span>
          <span>September 21, 2024</span>
        </div>
        <div className="book-section">
          <figure>
            <img src={Van} alt="" />
          </figure>
          <div className="location">
            <span>
              <p>Devghat to</p>
              <p>Kathmandu</p>
            </span>
            <span>
              <p>BA 1 Kha 9606</p>
            </span>
          </div>
          <div className="time">
            <div>
              <i class="fa-solid fa-location-pin"></i>
              <p>Kathmandu Kalanki (5:00 am)</p>
            </div>
            <div>
              <i class="fa-solid fa-location-dot"></i>
              <p>Devghat Town Chowk (12:00 pm)</p>
            </div>
          </div>
          <div className="type">
            <span>Devghat Micro</span>
            <span>Coach Type</span>
          </div>
          <div className="price">
            <p>Rs.600</p>
            <p>Fare/Seat</p>
          </div>
          <button className="seat-btn">View Seat</button>
        </div>
      </div>
    </section>
  );
}

export default Book;
