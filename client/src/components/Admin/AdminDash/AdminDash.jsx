import React, { useState, useEffect } from "react";
import "./AdminDash.css";

function AdminDash() {
  const [dashData, setDashData] = useState({});
  const [bookings, setBookings] = useState([]);

  const fetchDashData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/getDashData",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return console.log("Some error has occured");
      }
      setDashData(data);
      setBookings(data.totalBookings);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDashData();
  }, []);
  useEffect(() => {
    console.log(bookings);
  }, [dashData]);

  return (
    <>
      <section className="left-dash">
        <div className="upper-dash">
          <div className="single-dash">
            <span className="left-single">
              <p>Total Users</p>
              <h2>{dashData.totalUsers}</h2>
            </span>
            <i class="fa-solid fa-user"></i>
          </div>
          <div className="single-dash">
            <span className="left-single">
              <p>Total Bookings</p>
              <h2>{dashData.totalBooks}</h2>
            </span>
            <i class="fa-solid fa-couch"></i>
          </div>
          <div className="single-dash">
            <span className="left-single">
              <p>Total Vehicle</p>
              <h2>
                {dashData && dashData.totalVehicle
                  ? dashData.totalVehicle.length
                  : "N/A"}
              </h2>
            </span>
            <i class="fa-solid fa-van-shuttle"></i>
          </div>
          <div className="single-dash">
            <span className="left-single">
              <p>Total Trips</p>
              <h2>100</h2>
            </span>
            <i class="fa-solid fa-road"></i>
          </div>
        </div>
        <section className="table-container">
          <h2 className="book-table">Recent Bookings</h2>
          <table className="bookings-table">
            <thead>
              <tr>
                <th>S.N</th>
                <th>Phone Number</th>
                <th>Bus No</th>
                <th>Seat Booked</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td>{booking.phoneNumber}</td>
                  <td>{booking.vehicleNo}</td>
                  <td>
                    {booking && booking.seatData
                      ? booking.seatData.length
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </section>
    </>
  );
}

export default AdminDash;
