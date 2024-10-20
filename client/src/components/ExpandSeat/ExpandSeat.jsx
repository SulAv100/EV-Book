import React, { useEffect, useState } from "react";
import "./ExpandSeat.css";
import steering from "../../assets/steering-wheel.png";
import { useAuth } from "../../hooks/authContext";
import { useNavigate } from "react-router-dom";

function ExpandSeat({
  item,
  userBookedSeats = [],
  otherBookedSeats,
  confirmedSeats,
  setUserBookedSeats,
  userBookingId,
}) {
  const navigate = useNavigate();
  const [bookedSeat, setBookedSeat] = useState([]);

  useEffect(() => {
    console.log("User booking id is", userBookingId);
  }, [userBookingId]);

  useEffect(() => {
    if (item) {
      console.log(item.availableSeats, "YO hai seats");
    }
  }, [item]);

  useEffect(() => {
    const initialBookedSeats = JSON.parse(localStorage.getItem("seats")) || [];
    const uniqueSeats = Array.from(
      new Set([...initialBookedSeats, ...userBookedSeats])
    );
    setBookedSeat(uniqueSeats);
  }, [userBookedSeats]);

  const { getUserData, userContact } = useAuth();

  const handleBooking = (seatName) => {
    if (!userContact) {
      alert("Please login first");
      navigate("/login");
    }
    // Check if the seat is already booked by the user
    const isAlreadyBooked = bookedSeat.includes(seatName);

    // Toggle the seat selection
    setBookedSeat(
      (prev) =>
        isAlreadyBooked
          ? prev.filter((seat) => seat !== seatName) // Remove seat if already booked
          : [...prev, seatName] // Add seat if not booked
    );

    // Update userBookedSeats in the parent component
    setUserBookedSeats((prevState) => ({
      ...prevState,
      [item.index]: isAlreadyBooked
        ? (prevState[item.index] || []).filter((seat) => seat !== seatName) // Remove from booked seats, ensure it is an array
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
    console.log(
      JSON.stringify({
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
        bookingId: userBookingId || null,
      })
    );
    localStorage.setItem(
      "book",
      JSON.stringify({
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
        bookingId: userBookingId || null,
      })
    );
    navigate("/bookingpage");
  };

  const renderSeatButton = (seatName) => {
    const isBooked = bookedSeat.includes(seatName);
    const isUserBooked =
      Array.isArray(userBookedSeats) && userBookedSeats.includes(seatName);
    const isOtherBooked =
      Array.isArray(otherBookedSeats) && otherBookedSeats.includes(seatName);
    const isConfirmed =
      Array.isArray(confirmedSeats) && confirmedSeats.includes(seatName);

    let buttonStyle = {
      cursor: "pointer",
      backgroundColor: isBooked ? "lightcoral" : "white",
      color: isBooked || isUserBooked ? "white" : "black",
    };

    if (isConfirmed) {
      buttonStyle = {
        backgroundColor: "#d3d3d3",
        color: "white",
        cursor: "not-allowed",
      };
    } else if (isOtherBooked) {
      buttonStyle = {
        backgroundColor: "#544be5",
        color: "white",
        cursor: "not-allowed",
      };
    } else if (isUserBooked || isBooked) {
      buttonStyle = {
        backgroundColor: "lightcoral",
        color: "white",
      };
    }

    return (
      <button
        key={seatName}
        className={`seat-button ${
          isUserBooked ? "user-booked" : isOtherBooked ? "other-booked" : ""
        }`}
        onClick={
          isConfirmed || isOtherBooked ? null : () => handleBooking(seatName)
        }
        style={buttonStyle}
      >
        {seatName}
      </button>
    );
  };

  return (
    <section className="seat-select">
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
        {Number(item.availableSeats) === 14 ? (
          <div className="single-seat">
            {["A5", "B4", "C5"].map((seat) => renderSeatButton(seat))}
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="right-pricing">
        <table>
          {bookedSeat.length > 0 && (
            <thead>
              <tr>
                <th>Type</th>
                <th>Seat</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
          )}
          <tbody>
            {/* Filter out seats that are not booked anymore */}
            {[...new Set([...userBookedSeats, ...bookedSeat])]
              .filter((seat) => bookedSeat.includes(seat))
              .map((seat, index) => (
                <tr key={index}>
                  <td>Adult</td>
                  <td>{seat}</td>
                  <td>{item.price}</td>
                  <td>
                    <button
                      className="del-seat"
                      onClick={() => {
                        handleBooking(seat); // This will update bookedSeat and remove the seat from the table
                      }}
                    >
                      Remove
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
