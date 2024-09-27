import React, { useEffect, useState } from "react";
import "./ExpandSeat.css";
import steering from "../../assets/steering-wheel.png";
import { useAuth } from "../../hooks/authContext";
import { useNavigate } from "react-router-dom";

function ExpandSeat({
  item,
  userBookedSeats = [], // Ensure it's an array
  otherBookedSeats,
  confirmedSeats,
  setUserBookedSeats,
}) {
  const navigate = useNavigate();
  const [bookedSeat, setBookedSeat] = useState([]);

  useEffect(() => {
    const initialBookedSeats = JSON.parse(localStorage.getItem("seats")) || [];
    const uniqueSeats = Array.from(new Set([...initialBookedSeats, ...userBookedSeats]));
    setBookedSeat(uniqueSeats);
  }, [userBookedSeats]);

  const { getUserData, userContact } = useAuth();

  const handleBooking = (seatName) => {
    // Check if the seat is already booked by the user
    const isAlreadyBooked = bookedSeat.includes(seatName);
    
    // Toggle the seat selection
    setBookedSeat((prev) => 
      isAlreadyBooked 
      ? prev.filter(seat => seat !== seatName) // Remove seat if already booked
      : [...prev, seatName] // Add seat if not booked
    );

    // Update userBookedSeats in the parent component
    setUserBookedSeats((prevState) => ({
      ...prevState,
      [item.index]: isAlreadyBooked 
        ? (prevState[item.index] || []).filter(seat => seat !== seatName) // Remove from booked seats, ensure it is an array
        : [...(prevState[item.index] || []), seatName], // Add to booked seats, ensure it is an array
    }));
  };

  const total = bookedSeat.reduce((acc, data) => acc + parseInt(item.price), 0);

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    localStorage.setItem("seats", JSON.stringify(bookedSeat));
  }, [bookedSeat]);

  const handleBookFetch = () => {
    localStorage.setItem("book", JSON.stringify({
      seatType: "Adult",
      seatData: bookedSeat,
      price: bookedSeat.length * item.price,
      vehicleNo: item.vehicleNo,
      startLocation: item.startLocation,
      departTime: item.departTime,
      destination: item.destination,
      droppingTime: item.droppingTime,
      date: item.date,
      phoneNumber: userContact,
    }));
    navigate("/bookingpage");
  };

  const renderSeatButton = (seatName) => {
    const isBooked = bookedSeat.includes(seatName);
    const isUserBooked = Array.isArray(userBookedSeats) && userBookedSeats.includes(seatName);
    const isOtherBooked = Array.isArray(otherBookedSeats) && otherBookedSeats.includes(seatName);
    const isConfirmed = Array.isArray(confirmedSeats) && confirmedSeats.includes(seatName);

    let buttonStyle = {
      cursor: "pointer",
    };
    
    if (isConfirmed) {
      buttonStyle = {
        backgroundColor: "red",
        color: "white",
        cursor: "not-allowed",
      };
    } else if (isOtherBooked) {
      buttonStyle = {
        backgroundColor: "blue",
        color: "white",
        cursor: "not-allowed",
      };
    } else if (isUserBooked || isBooked) {
      buttonStyle = {
        backgroundColor: "lightcoral", // Change color when booked
        color: "white",
      };
    }

    return (
      <button
        key={seatName}
        className={`seat-button ${isUserBooked ? "user-booked" : isOtherBooked ? "other-booked" : ""}`}
        onClick={isConfirmed || isOtherBooked ? null : () => handleBooking(seatName)}
        style={buttonStyle}
      >
        {seatName}
      </button>
    );
  };

  return (
    <section className="seat-select">
      <div className="left-seat-info">
        <div className="wheel">
          <img src={steering} alt="Steering Wheel" />
        </div>
        <div className="single-seat">
          {["A1", "C1"].map(renderSeatButton)}
        </div>
        <div className="single-seat">
          {["A2", "B1", "C2"].map(renderSeatButton)}
        </div>
        <div className="single-seat">
          {["A3", "B2", "C3"].map(renderSeatButton)}
        </div>
        <div className="single-seat">
          {["A4", "B3", "C4"].map(renderSeatButton)}
        </div>
      </div>
      <div className="right-pricing">
        <table>
          {bookedSeat.length > 0 && (
            <thead>
              <tr>
                <th>Seat Type</th>
                <th>Seat</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
          )}
          <tbody>
            {/* Display user booked and currently selected seats */}
            {[...new Set([...userBookedSeats, ...bookedSeat])].map((seat, index) => (
              <tr key={index}>
                <td>Adult</td>
                <td>{seat}</td>
                <td>{item.price}</td>
                <td>
                  <button className="del-seat" onClick={() => handleBooking(seat)}>
                    {bookedSeat.includes(seat) ? "Remove" : "Add"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {bookedSeat.length >= 1 && (
          <div className="total">
            <span>Total: Rs {total}</span>
            <button onClick={handleBookFetch} className="book-now">
              Book Now
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ExpandSeat;
