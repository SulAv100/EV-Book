import React, { useState, useEffect } from "react";
import "./DisplayTravel.css";
import { useAuth } from "../../../hooks/authContext";

function DisplayTravel() {
  const { fetchTravel, fetchData } = useAuth();

  useEffect(() => {
    fetchTravel();
  }, []);

  const handleDelete = async (travelId) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/setTravel",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ travelId }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        return;
      }

      const data = await response.json();
      console.log(data);
      window.location.reload();
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="display-travel">
      <h1>Travel Information</h1>
      <table className="travel-table">
        {!fetchData?.length == 0 ? (
          <>
            <thead>
              <tr>
                <th>SN</th>
                <th>Vehicle No</th>
                <th>Date</th>
                <th>Start Location</th>
                <th>Destination</th>
                <th>Action</th>
              </tr>
            </thead>
          </>
        ) : (
          <>
            <h2>No data available</h2>
          </>
        )}
        <tbody>
          {fetchData.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.vehicleNo}</td>
              <td>{data.date}</td>
              <td>{data.startLocation}</td>
              <td>{data.destination}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(data._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayTravel;
