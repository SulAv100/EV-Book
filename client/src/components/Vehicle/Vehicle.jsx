import React from "react";
import "./Vehicle.css";

function Vehicle({ image, vehicleNumber, date, departureTime, route, fare }) {
  return (
    <div className="vehicle-card">
      <img src={image} alt="Vehicle" className="vehicle-image" />
      <div className="vehicle-details">
        <div className="details-group">
          <div className="detail-row">
            <div className="detail-column">
              <label className="detail-label">Vehicle Number:</label>
              <p className="detail-value">{vehicleNumber}</p>
            </div>
            <div className="detail-column">
              <label className="detail-label">Departure Time:</label>
              <p className="detail-value">{departureTime}</p>
            </div>
          </div>
          <div className="detail-row">
            <div className="detail-column">
              <label className="detail-label">Route:</label>
              <p className="detail-value">{route}</p>
            </div>
            <div className="detail-column">
              <label className="detail-label">Date:</label>
              <p className="detail-value">{date}</p>
            </div>
          </div>
          <div className="detail-row">
            <div className="detail-column">
              <label className="detail-label">Fare:</label>
              <p className="detail-value fare">{fare}</p>
            </div>
          </div>
        </div>
        <div className="details-footer">
          <button className="book-button">Book</button>
        </div>
      </div>
    </div>
  );
}

export default Vehicle;
