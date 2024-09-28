import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import { useAuth } from "../../hooks/authContext";

const ProfilePage = () => {
  // State for password change form
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const { getUserData, userDetail, userContact } = useAuth();
  const [bookingHistory, setBookingHistory] = useState([]); // State for booking history

  // Fetch user data on component mount
  useEffect(() => {
    getUserData();
  }, []);

  // Get user phone number from context
  const phoneNumber = userContact; // Use userContact instead

  // Fetch confirmed bookings based on user contact
  const getConfirmedBooks = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/admin/getUserSeat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }), // Send userNumber
      });

      const data = await response.json();
      if (!response.ok) {
        console.log("Network error occurred");
        return;
      }
      console.log(data); // Log confirmed bookings data for debugging
      setBookingHistory(data); // Update booking history with the fetched data
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch confirmed bookings when userContact changes
  useEffect(() => {
    if (phoneNumber) { // Ensure userNumber is available before fetching
      getConfirmedBooks();
    }
  }, [phoneNumber]);

  // Handle password change input
  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Profile</h1>
      </div>

      <div className="profile-info">
        <h2>Name: {userDetail.firstName}</h2>
        <p>Phone Number: {userContact}</p> {/* Display userContact */}
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
            {bookingHistory.map((booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1}</td>
                <td>{booking.date}</td>
                <td>{`${booking.startLocation} to ${booking.destination}`}</td>
                <td>{booking.seatData.join(', ')}</td> {/* Join seatData array for display */}
                <td>{booking.vehicleNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="password-change">
        <h3>Change Password</h3>
        <form>
          <div>
            <label>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={passwords.currentPassword}
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
