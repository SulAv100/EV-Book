import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import { useAuth } from "../../hooks/authContext";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [passwords, setPasswords] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const { getUserData, userDetail, userContact } = useAuth();

  const navigate = useNavigate();
  const [bookingHistory, setBookingHistory] = useState([]);

  useEffect(() => {
    getUserData();
  }, []);

  const phoneNumber = userContact;

  const getConfirmedBooks = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/getUserSeat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phoneNumber }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        console.log("Network error occurred");
        return;
      }
      console.log(data);
      setBookingHistory(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (phoneNumber) {
      getConfirmedBooks();
    }
  }, [phoneNumber]);

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const changePassword = async (event) => {
    event.preventDefault();

    if (passwords.newPassword === passwords.confirmNewPassword) {
      try {
        const response = await fetch(
          "http://localhost:3000/api/auth/changePassword",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ phoneNumber, passwords }),
          }
        );
        const data = await response.json();
        if (!response.ok) {
          console.log("Network error occured");
          return;
        } else {
          console.log(data);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Incorrect password");
      return;
    }
  };

  const displayTicket = (ticketId) => {
    if (ticketId) {
      navigate(`/ticket/${ticketId}`);
    } else {
      console.log("Something went wrong");
      return;
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Profile</h1>
      </div>

      <div className="profile-info">
        <h2>Name: {userDetail.firstName}</h2>
        <p>Phone Number: {userContact}</p>
      </div>

      <div className="booking-history">
        <h3>Booking History</h3>
        <table>
          <thead>
            <tr>
              <th>SN</th>
              <th>Date</th>
              <th>Journey</th>
              <th>Seat Booked</th>
              <th>Vehicle No</th>
            </tr>
          </thead>
          <tbody>
            {bookingHistory
              .slice()
              .reverse()
              .map((booking, index) => (
                <tr
                  onClick={() => displayTicket(booking._id)}
                  key={booking._id}
                >
                  <td>{index + 1}</td>
                  <td>{booking.date}</td>
                  <td>{`${booking.startLocation} to ${booking.destination}`}</td>
                  <td>{booking.seatData.join(", ")}</td>
                  <td>{booking.vehicleNo}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="password-change">
        <h3>Change Password</h3>
        <form onSubmit={changePassword}>
          <div>
            <label>Current Password</label>
            <input
              type="password"
              name="password"
              value={passwords.password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div>
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div>
            <label>Rewrite New Password</label>
            <input
              type="password"
              name="confirmNewPassword"
              value={passwords.confirmNewPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit">Change Password</button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
