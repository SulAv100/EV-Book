import React, { useState, useEffect } from "react";
import "./BookSeat.css";

function BookSeat() {
  // Sample data for booked seats
  const [bookings, setBookings] = useState([]);

  const bringBookData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/admin/bookSeat", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) {
        console.log("Network error occured");
        return;
      }
      setBookings(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    bringBookData();
  }, []);
  useEffect(() => {
    console.log(bookings);
  }, [bookings]);

  // Function to handle confirm action
  const handleConfirm = async (bookingData) => {
    try {
      console.log(bookingData);
      const response = await fetch(
        "http://localhost:3000/api/admin/confirmBook",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bookingData }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        console.log("Network error has occured");
        return;
      }
      console.log(data);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle delete action
  const handleDelete = async (bookingId) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/deleteBook",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bookingId }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        console.log("Network error has occured");
        return;
      }
      console.log(data);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="book-seat">
      <h2>Booked Seats</h2>
      {bookings?.length < 1 ? (
        <>
          <h1
            style={{
              textAlign: "center",
            }}
          >
            No data available
          </h1>
        </>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Sn</th>
              <th>Phone Number</th>
              <th>Bus Number</th>
              <th>Date</th>
              <th>Booked Seats</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1}</td>
                <td>{booking.phoneNumber}</td>
                <td>{booking.vehicleNo}</td>
                <td>{booking.date}</td>
                <td>{booking.seatData.join(",")}</td>
                <td>
                  <button
                    className="confirm"
                    onClick={() => handleConfirm(booking)}
                  >
                    Confirm
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleDelete(booking._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BookSeat;
