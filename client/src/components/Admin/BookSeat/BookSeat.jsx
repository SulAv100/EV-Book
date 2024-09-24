import React, { useState } from "react";
import "./BookSeat.css";

function BookSeat() {
  // Sample data for booked seats
  const [bookings, setBookings] = useState([
    {
      id: 1,
      phoneNumber: "9876543210",
      busno: "1234w",
      bookedSeats: ["A1", "B1", "C1"],
    },
    {
      id: 2,
      phoneNumber: "1234567890",
      busno: "1234w",
      bookedSeats: ["D2", "E2", "F2"],
    },
    {
      id: 3,
      phoneNumber: "5556667777",
      busno: "1234w",
      bookedSeats: ["G3", "H3", "I3"],
    },
  ]);

  // Function to handle confirm action
  const handleConfirm = (id) => {
    console.log(`Confirmed booking for ID: ${id}`);
    // Add confirmation logic here
  };

  // Function to handle delete action
  const handleDelete = (id) => {
    const updatedBookings = bookings.filter((booking) => booking.id !== id);
    setBookings(updatedBookings);
    console.log(`Deleted booking with ID: ${id}`);
  };

  return (
    <div className="book-seat">
      <h2>Booked Seats</h2>
      <table>
        <thead>
          <tr>
            <th>Sn</th>
            <th>Phone Number</th>
            <th>Bus Number</th>
            <th>Booked Seats</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={booking.id}>
              <td>{index + 1}</td>
              <td>{booking.phoneNumber}</td>
              <td>{booking.busno}</td>
              <td>{booking.bookedSeats.join(", ")}</td>
              <td>
                <button className="confirm" onClick={() => handleConfirm(booking.id)}>
                  Confirm
                </button>
                <button className="delete" onClick={() => handleDelete(booking.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookSeat;
