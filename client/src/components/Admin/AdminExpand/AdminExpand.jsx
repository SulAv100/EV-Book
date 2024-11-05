import React, { useState } from "react";
import "../../ExpandSeat/ExpandSeat.css";
import steering from "../../../assets/steering-wheel.png";
import "./AdminExpand.css";

function AdminExpand({ booked = [], confirmed = [] }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const bookedSeats = booked.flatMap((seatObj) => seatObj.seatData || []);
  const confirmedSeats = confirmed.flatMap((seatObj) => seatObj.seatData || []);

  const renderSeatButton = (seatName) => {
    const isBooked = bookedSeats.includes(seatName);
    const isConfirmed = confirmedSeats.includes(seatName);
    const isSelected = selectedSeats.includes(seatName);
    const seatClass = isBooked
      ? "booked-seat"
      : isConfirmed
      ? "confirmed-seat"
      : isSelected
      ? "selected-seat"
      : "";

    const handleSeatClick = () => {
      if (!isBooked && !isConfirmed) {
        setSelectedSeats((prev) => 
          prev.includes(seatName) ? prev.filter((seat) => seat !== seatName) : [...prev, seatName]
        );
      }
    };

    return (
      <button
        key={seatName}
        className={`seat-button ${seatClass}`}
        disabled={isBooked || isConfirmed} 
        onClick={handleSeatClick}
      >
        {seatName}
      </button>
    );
  };

  const handleBookSeats = () => {
    // Implement your booking logic here
    console.log("Booked Seats:", selectedSeats);
    // Clear selected seats after booking
    setSelectedSeats([]);
  };

  return (
    <section className="seat-select">
      <div className="left-side">
        <h3>Booked Seats</h3>
        <table className="booked-seats-table">
          <thead>
            <tr>
              <th>Seat</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {booked.map((seatObj, index) => 
              seatObj.seatData.map((seat) => (
                <tr key={`${seat}-${index}`}>
                  <td>{seat}</td>
                  <td>{seatObj.phoneNumber}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {selectedSeats.length > 0 && (
          <button onClick={handleBookSeats} className="book-seat-button">
            Book Seats
          </button>
        )}
      </div>

      <div className="right-side">
        <div className="left-seat-info">
          <div className="outer-wheel">
            <div className="wheel">
              <img src={steering} alt="Steering Wheel" />
            </div>
          </div>
          <div className="single-seat">{["A1", "C1"].map(renderSeatButton)}</div>
          <div className="single-seat">
            {["A2", "B1", "C2"].map(renderSeatButton)}
          </div>
          <div className="single-seat">
            {["A3", "B2", "C3"].map(renderSeatButton)}
          </div>
          <div className="single-seat">
            {["A4", "B3", "C4"].map(renderSeatButton)}
          </div>
          <div className="single-seat">
            {["A5", "B4", "C5"].map(renderSeatButton)}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminExpand;
