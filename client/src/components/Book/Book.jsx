import React, { useState, useEffect } from "react";
import "./Book.css";
import Van from "../../assets/van.jpg";
import ExpandSeat from "../ExpandSeat/ExpandSeat";
import { useAuth } from "../../hooks/authContext";

const TripCard = ({ imgSrc, handleSeat, isExpanded, item }) => (
  <section className="outer-box">
    <div className="outer-container">
      <figure>
        <img src={imgSrc} alt="van" />
      </figure>
      <div className="left-book">
        <div className="destination">
          <div className="start-point">
            <span>5:00 AM</span>
            <span>{item.startLocation}</span>
          </div>
          <div className="time-lapse">
            <span>{item.duration}</span>
            <span>-----------------------------------------------</span>
          </div>
          <div className="start-point">
            <span>12:00 PM</span>
            <span>{item.destination}</span>
          </div>
        </div>
        <div className="time-facility">
          <div className="departure">
            <span>Date:</span>
            <p>{item.date}</p>
          </div>
          <div className="departure">
            <span>Seats available:</span>
            <p className="seats">{item.availableSeats}</p>
          </div>
        </div>
      </div>
      <div className="right-book">
        <div className="middle-box">
          <span>Per seat from</span>
          <span className="fare">
            <p>NPR</p>
            <p>{item.price}</p>
          </span>
          <button onClick={handleSeat}>Book Seats</button>
        </div>
      </div>
    </div>
    {isExpanded && <ExpandSeat item={item} />}
  </section>
);

function Book() {
  const [expandedSeats, setExpandedSeats] = useState([false, false]);

  const { fetchTravel, fetchData } = useAuth();

  const handleSeat = (index) => {
    const updatedSeats = expandedSeats.map((seat, i) =>
      i === index ? !seat : seat
    );
    setExpandedSeats(updatedSeats);
  };

  useEffect(() => {
    fetchTravel();
  }, []);

  return (
    <>
      {fetchData?.map((item, index) => (
        <TripCard
          key={index}
          imgSrc={Van}
          handleSeat={() => handleSeat(index)}
          isExpanded={expandedSeats[index]}
          item={item}
        />
      ))}
    </>
  );
}

export default Book;
