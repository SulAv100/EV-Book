import React, { useState } from "react";
import "./Book.css";
import Van from "../../assets/van.jpg";
import EV from "../../assets/ev.jpg";
import ExpandSeat from "../ExpandSeat/ExpandSeat";

const TripCard = ({ imgSrc, handleSeat, isExpanded }) => (
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
            <p>Shrawan 15, 2081</p>
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
          <button onClick={handleSeat}>Book Seats</button>
        </div>
      </div>
    </div>
    {isExpanded && <ExpandSeat />}
  </section>
);

function Book() {
  const [expandedSeats, setExpandedSeats] = useState([false, false]);

  const handleSeat = (index) => {
    const updatedSeats = expandedSeats.map((seat, i) =>
      i === index ? !seat : seat
    );
    setExpandedSeats(updatedSeats);
  };

  return (
    <>
      <TripCard
        imgSrc={Van}
        handleSeat={() => handleSeat(0)}
        isExpanded={expandedSeats[0]}
      />

      <TripCard
        imgSrc={EV}
        handleSeat={() => handleSeat(1)}
        isExpanded={expandedSeats[1]}
      />
    </>
  );
}

export default Book;
