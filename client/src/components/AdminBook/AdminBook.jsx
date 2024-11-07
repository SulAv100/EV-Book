import React, { useEffect, useState } from "react";
import "./AdminBook.css";

const AdminBook = ({ isOpen, onClose, selectedSeats, selectedTravel }) => {
  const [bookingData, setBookingData] = useState({});

  useEffect(() => {
    if (selectedSeats) {
      setBookingData({
        phoneNumber: "",
        _id: selectedTravel._id,
        vehicleNo: selectedTravel?.vehicleNo || "",
        date: selectedTravel?.date || "",
        startLocation: selectedTravel?.startLocation || "",
        destination: selectedTravel?.destination || "",
        seatData: selectedSeats,
      });
    }
  }, [selectedSeats]);

  useEffect(() => {
    if (selectedTravel && selectedSeats) {
      console.log("Selected Seats:", selectedSeats);
      console.log("Selected Travels:", selectedTravel);
    }
  }, [selectedSeats, selectedTravel]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const bookSeatAdmin = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(bookingData));
    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/adminBookSeat",
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
        console.log(response.statusText);
        return;
      }
      console.log(data);
      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Book Your Ride</h2>

        <p>
          <strong>Selected Seats: </strong>
          {selectedSeats.join(", ")}
        </p>

        <form className="booking-form" onSubmit={bookSeatAdmin}>
          <div className="form-container">
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={bookingData.phoneNumber}
                onChange={handleChange}
                pattern="[0-9]{10}"
                placeholder="Enter 10-digit phone number"
                required
              />
              <small>Phone number must be 10 digits</small>
            </div>

            <div className="form-group">
              <label>Vehicle Number</label>
              <input
                type="text"
                name="vehicleNo"
                value={bookingData.vehicleNo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={bookingData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Start Location</label>
              <input
                type="text"
                name="startLocation"
                value={bookingData.startLocation}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Destination</label>
              <input
                type="text"
                name="destination"
                value={bookingData.destination}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Seats</label>
              <input
                type="text"
                name="seats"
                value={bookingData.seatData}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="confirm-button">
            Confirm Booking
          </button>
        </form>

        <button onClick={onClose} className="close-button">
          Close
        </button>
      </div>
    </div>
  );
};

export default AdminBook;
