import React from "react";
import "./AdminDash.css";

function AdminDash() {
  const bookings = [
    { sn: 1, phoneNumber: "9876543210", busNo: "AB-1234", seatBooked: 12 },
    { sn: 2, phoneNumber: "9876543211", busNo: "AB-5678", seatBooked: 20 },
    { sn: 3, phoneNumber: "9876543212", busNo: "AB-4321", seatBooked: 10 },
    { sn: 4, phoneNumber: "9876543213", busNo: "AB-8765", seatBooked: 25 },
    { sn: 5, phoneNumber: "9876543214", busNo: "AB-9876", seatBooked: 18 },
  ];
  return (
    <>
      <section className="left-dash">
        <div className="upper-dash">
          <div className="single-dash">
            <span className="left-single">
              <p>Total Users</p>
              <h2>500</h2>
            </span>
            <i class="fa-solid fa-user"></i>
          </div>
          <div className="single-dash">
            <span className="left-single">
              <p>Total Bookings</p>
              <h2>500</h2>
            </span>
            <i class="fa-solid fa-couch"></i>
          </div>
          <div className="single-dash">
            <span className="left-single">
              <p>Total Vehicle</p>
              <h2>2</h2>
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
              {bookings.map((booking) => (
                <tr key={booking.sn}>
                  <td>{booking.sn}</td>
                  <td>{booking.phoneNumber}</td>
                  <td>{booking.busNo}</td>
                  <td>{booking.seatBooked}</td>
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
