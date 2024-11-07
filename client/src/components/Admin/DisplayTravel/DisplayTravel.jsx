import React, { useState, useEffect } from "react";
import "./DisplayTravel.css";
import { useAuth } from "../../../hooks/authContext";
import { useNavigate } from "react-router-dom";
import AdminExpand from "../AdminExpand/AdminExpand";

function DisplayTravel() {
  const { fetchAllTravel, fetchAllData } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [booked, setBooked] = useState([]);
  const [confirmed, setConfirmed] = useState([]);
  const [selectedTravel, setSelectedTravel] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllTravel();
  }, []);

  const fetchSpecificData = async (vehicleNo, date) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/getBusData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ vehicleNo, date }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        console.log(response.statusText);
        return;
      }
      setBooked(data.bookedSeat);
      setConfirmed(data.confirmedSeat);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (travelId) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/removeTravel",
        {
          method: "POST",
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
      console.log("Deleted data:", data);
      window.location.reload();
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleView = (data) => {
    fetchSpecificData(data.vehicleNo, data.date);
    setSelectedTravel(data);
    setIsExpanded(true);
  };

  return (
    <>
      <div className="display-travel">
        <h1>Travel Information</h1>
        <table className="travel-table">
          {!fetchAllData?.length ? (
            <h2>No data available</h2>
          ) : (
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
              <tbody>
                {fetchAllData.map((data, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.vehicleNo}</td>
                    <td>{data.date}</td>
                    <td>{data.startLocation}</td>
                    <td>{data.destination}</td>
                    <td>
                      <button
                        className="view-button"
                        onClick={() => handleView(data)}
                      >
                        View
                      </button>
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
            </>
          )}
        </table>
      </div>
      {isExpanded && (
        <AdminExpand
          booked={booked}
          selectedTravel={selectedTravel}
          confirmed={confirmed}
        />
      )}
    </>
  );
}

export default DisplayTravel;
