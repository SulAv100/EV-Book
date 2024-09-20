import React from "react";
import "./Book.css";
import Van from "../../assets/van.jpg";
import EV from '../../assets/ev.jpg';

const TripCard = ({ imgSrc }) => (
  <section className="outer-box">
    <div className="outer-container">
      <figure>
        <img src={imgSrc} alt="van" />
      </figure>
      <div className="left-book">
        <div className="destination">
          <div className="start-point">
            <span>5:00 AM</span>
            <span>Kathmandu</span>
          </div>
          <div className="time-lapse">
            <span>10 Hours</span>
            <span>-----------------------------------------------</span>
          </div>
          <div className="start-point">
            <span>12:00 PM</span>
            <span>Devghat</span>
          </div>
        </div>
        <div className="time-facility">
          <div className="departure">
            <span>Date:</span>
            <p>Shrawan 15,2081</p>
          </div>
          <div className="departure">
            <span>Seats available:</span>
            <p className="seats">8 seats</p>
          </div>
        </div>
      </div>
      <div className="right-book">
        <div className="middle-box">
          <span>Per seat from</span>
          <span className="fare">
            <p>NPR</p>
            <p>1600</p>
          </span>
          <button>Book Seats</button>
        </div>
      </div>
    </div>
  </section>
);

function Book() {
  return (
    <>
      <TripCard imgSrc={Van} />
      <TripCard imgSrc={EV} />
    </>
  );
}

export default Book;
