import React, { useState, useEffect } from "react";
import "./BookingPage.css";
import { useNavigate } from "react-router-dom";

function BookingPage() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  // Parse the data from localStorage
  const initialBookData = localStorage.getItem("book")
    ? JSON.parse(localStorage.getItem("book"))
    : {};

  const [bookData, setBookData] = useState(initialBookData);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    console.log(bookData);
  }, [bookData]);

  // Safe access to the data
  const startLocation = bookData.startLocation || "Unknown";
  const vehicleNo = bookData.vehicleNo || "Unknown";
  const destination = bookData.destination || "Unknown";
  const date = bookData.date || "N/A";
  const departTime = bookData.departTime || "N/A";
  const droppingTime = bookData.droppingTime || "N/A";
  const seatData = bookData.seatData || [];
  const price = bookData.price / seatData.length || 0;
  const phoneNumber = bookData.phoneNumber || "N/A";
  const bookingId = bookData.bookingId || "N/A";

  const subtotal = seatData.length * price;

  const sendDatatoAdmin = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/admin/bookSeat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          seatType: "Adult",
          seatData: seatData,
          price: price,
          vehicleNo: vehicleNo,
          startLocation: startLocation,
          departTime: departTime,
          destination: destination,
          droppingTime: droppingTime,
          date: date,
          phoneNumber: phoneNumber,
          bookingId: bookingId,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(response.statusText);
        return;
      }
      localStorage.removeItem("book");
      navigate("/");
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="booking-page">
      <h1 className="booking-title">Cart</h1>
      <div className="info-section">
        <div className="left-info">
          <i className="fas fa-check-circle"></i>
          <span>
            {startLocation} to {destination} has been booked
          </span>
        </div>
        <div className="right-info">
          <button className="continue-button">
            {isMobile ? "Book" : "Continue Booking"}
          </button>
        </div>
      </div>
      <div className="booking-table">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Booking Details</th>
              <th>Seat</th>
              <th>Single Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <i className="fas fa-trash"></i>
              </td>
              <td>
                <div className="full-data">
                  <h3 className="route-title">
                    {startLocation} to {destination}
                  </h3>
                  <h3 className="details-header">Booking Details:</h3>
                  <div className="book-location">
                    <div className="single-book">
                      <i className="fas fa-map-marker-alt"></i>
                      <p>Boarding:</p>
                      <p>{startLocation}</p>
                      <p>
                        {date} {departTime}
                      </p>
                    </div>
                    <div className="single-book">
                      <i className="fas fa-map-marker-alt"></i>
                      <p>Dropping:</p>
                      <p>{destination}</p>
                      <p>
                        {date} {droppingTime}
                      </p>
                    </div>
                  </div>
                </div>
              </td>
              <td>{seatData.join(", ")}</td>
              <td>Rs. {price}</td>
              <td>Rs. {subtotal}</td>
            </tr>
          </tbody>
        </table>
        <button onClick={sendDatatoAdmin} className="order-button">
          Order now
        </button>
      </div>
    </section>
  );
}

export default BookingPage;
