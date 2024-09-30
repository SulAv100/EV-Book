import React, { useState, useEffect } from "react";
import "./FinishTravel.css";

function FinishTravel() {
  const [travelHistory, setTravelHistory] = useState([]);

  const fetchCompletedTravel = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/removeTravel",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return console.log("An error has occurred");
      }

      // Update the travelHistory state with fetched data
      setTravelHistory(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCompletedTravel();
  }, []);

  return (
    <div className="travel-container">
      <h1>Bus Travel History</h1>
      <table>
        <thead>
          <tr>
            <th>SN</th>
            <th>Bus No</th>
            <th>Date</th>
            <th>Route</th>
          </tr>
        </thead>
        <tbody>
          {travelHistory.map((travel, index) => (
            <tr key={travel._id || index}>
              <td>{index + 1}</td>
              <td>{travel.vehicleNo}</td>
              <td>{new Date(travel.date).toLocaleDateString()}</td>
              <td>{`${travel.startLocation} to ${travel.destination}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FinishTravel;
