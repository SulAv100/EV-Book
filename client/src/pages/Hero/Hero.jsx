import React, { useState, useEffect } from "react";
import "./Hero.css";
import Book from "../../components/Book/Book";
import { useAuth } from "../../hooks/authContext";
import { useNavigate } from "react-router-dom";
import Contact from "../Contact/Contact";

function Hero() {
  const navigate = useNavigate();
  const { getUserData, getAdminData, isAdmin, fetchTravel } = useAuth();
  const [todayDate, setTodayDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const currentDate = new Date();

    // Format the date (YYYY-MM-DD)
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    // Format the time (HH:mm AM/PM)
    let hours = currentDate.getHours();
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 24-hour time to 12-hour time
    const formattedTime = `${hours}:${minutes} ${ampm}`;

    console.log("Formatted Date:", formattedDate);
    console.log("Formatted Time:", formattedTime);

    // Set the date and time state
    setTodayDate(formattedDate);
    setCurrentTime(formattedTime);
  }, []);

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (todayDate) {
      checkExpire();
    }
  }, [todayDate]);

  const checkExpire = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/checkExpire",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            todayDate: todayDate,
            currentTime: currentTime,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        console.log(response.statusText);
        return;
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAdminData();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      navigate("/admin");
    }
  }, [isAdmin, navigate]);

  const [formData, setFormData] = useState({
    startLocation: "",
    destination: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmission = (event) => {
    event.preventDefault();
    if (formData) {
      fetchTravel(formData);
    }
  };

  return (
    <>
      <div className="hero-container">
        <form className="travel-form" onSubmit={handleSubmission}>
          <input
            type="text"
            name="startLocation"
            placeholder="Start Location"
            value={formData.startLocation}
            onChange={handleChange}
          />
          <input
            type="text"
            name="destination"
            placeholder="Destination"
            value={formData.destination}
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          <button type="submit">Search</button>
        </form>

        <main className="interaction-part">
          <div className="book-overlay">
            <Book formData={formData} />
          </div>
        </main>
        <Contact />
      </div>
    </>
  );
}

export default Hero;
