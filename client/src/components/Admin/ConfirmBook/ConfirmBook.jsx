import React, { useState, useEffect } from "react";
import "./ConfirmBook.css";

function ConfirmBook() {
  const [confirmBook, setConfirmBook] = useState([]);
  const fetchConfirmBook = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/confirmBook",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return console.log("An error has occured");
      }
      setConfirmBook(data.allData);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchConfirmBook();
  }, []);

  return (
    <div className="display-travel">
      <h1>Confirmed Bookings</h1>
      <table className="travel-table">
        <thead>
          <tr>
            <th>SN</th>
            <th>Vehicle No</th>
            <th>Phone Number</th>
            <th>Date</th>
            <th>Seat</th>
            <th>Start Location</th>
            <th>Destination</th>
          </tr>
        </thead>
        <tbody>
          {confirmBook.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.vehicleNo}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.date}</td>
              <td>{item.seatData.join(',')}</td>
              <td>{item.startLocation}</td>
              <td>{item.destination}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ConfirmBook;
