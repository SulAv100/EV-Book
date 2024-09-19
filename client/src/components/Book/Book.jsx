import React, { useState } from "react";
import "./Book.css";
import Vehicle from "../Vehicle/Vehicle"; // Import the new Vehicle component

function Book() {
  const [showVehicles, setShowVehicles] = useState(null);

  const handleSearchClick = (route) => {
    setShowVehicles(route);
  };

// Dummy vehicle data with additional information
const vehicleData = {
  route1: [
    {
      image: "https://via.placeholder.com/100",
      vehicleNumber: "BUS123",
      date: "2024-09-30",
      departureTime: "10:00 AM",
      route: "Devghat to Kathmandu",
      fare: "$25", // Added fare information
    },
    {
      image: "https://via.placeholder.com/100",
      vehicleNumber: "CAR456",
      date: "2024-09-30",
      departureTime: "11:00 AM",
      route: "Devghat to Kathmandu",
      fare: "$35", // Added fare information
    },
  ],
  route2: [
    {
      image: "https://via.placeholder.com/100",
      vehicleNumber: "BUS789",
      date: "2024-09-30",
      departureTime: "09:00 AM",
      route: "Kathmandu to Devghat",
      fare: "$30", // Added fare information
    },
    {
      image: "https://via.placeholder.com/100",
      vehicleNumber: "CAR012",
      date: "2024-09-30",
      departureTime: "01:00 PM",
      route: "Kathmandu to Devghat",
      fare: "$40", // Added fare information
    },
  ],
  route3: [
    {
      image: "https://via.placeholder.com/100",
      vehicleNumber: "TRUCK345",
      date: "2024-09-30",
      departureTime: "03:00 PM",
      route: "Kathmandu to Pokhara",
      fare: "$60", // Added fare information
    },
  ],
};


  return (
    <div className="route-container">
      {/* First Route: Devghat to Kathmandu */}
      <div className="route">
        <div className="row-options">
          <div className="single-option">
            <span className="single-location">
              <i className="fa-solid fa-location-pin"></i>
              <p>Starting Point</p>
            </span>
            <input
              type="text"
              value="Devghat"
              readOnly
              className="readonly-input"
            />
          </div>
          <div className="single-option">
            <span className="single-location">
              <i className="fa-solid fa-location-dot"></i>
              <p>Destination</p>
            </span>
            <input
              type="text"
              value="Kathmandu"
              readOnly
              className="readonly-input"
            />
          </div>
          <div className="single-option">
            <span className="single-location">
              <i className="fa-solid fa-calendar"></i>
              <p>Travel Date</p>
            </span>
            <div className="date-search-wrapper">
              <input type="date" className="date-input" />
              <button className="search-button" onClick={() => handleSearchClick('route1')}>
                <i className="fa-solid fa-search"></i>
              </button>
            </div>
          </div>
        </div>
        {/* Vehicle Information for Devghat to Kathmandu */}
        {showVehicles === 'route1' && (
          <div className="vehicle-list">
            {vehicleData.route1.map((vehicle, index) => (
              <Vehicle key={index} {...vehicle} />
            ))}
          </div>
        )}
      </div>

      {/* Second Route: Kathmandu to Devghat */}
      <div className="route">
        <div className="row-options">
          <div className="single-option">
            <span className="single-location">
              <i className="fa-solid fa-location-pin"></i>
              <p>Starting Point</p>
            </span>
            <input
              type="text"
              value="Kathmandu"
              readOnly
              className="readonly-input"
            />
          </div>
          <div className="single-option">
            <span className="single-location">
              <i className="fa-solid fa-location-dot"></i>
              <p>Destination</p>
            </span>
            <input
              type="text"
              value="Devghat"
              readOnly
              className="readonly-input"
            />
          </div>
          <div className="single-option">
            <span className="single-location">
              <i className="fa-solid fa-calendar"></i>
              <p>Travel Date</p>
            </span>
            <div className="date-search-wrapper">
              <input type="date" className="date-input" />
              <button className="search-button" onClick={() => handleSearchClick('route2')}>
                <i className="fa-solid fa-search"></i>
              </button>
            </div>
          </div>
        </div>
        {/* Vehicle Information for Kathmandu to Devghat */}
        {showVehicles === 'route2' && (
          <div className="vehicle-list">
            {vehicleData.route2.map((vehicle, index) => (
              <Vehicle key={index} {...vehicle} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Book;
