import React, { useState } from "react";
import "./TravelSet.css";

function TravelSet() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    vehicleNo: "",
    startLocation: "",
    destination: "",
    date: "",
    duration: "",
    availableSeats: "",
    price:""
  });

  const populateForm = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleDateSet = async (event) => {
    event.preventDefault();
    console.log(JSON.stringify(formData));

    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/setTravel",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        console.log("Something bad is about to happen");
        return;
      }
      console.log(data);
      setFormData({
        vehicleNo: "",
        startLocation: "",
        destination: "",
        date: "",
        duration: "",
        availableSeats: "",
        price:""
      });
      toggleFormVisibility();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <>
      <div className="cover-row">
        <section className="travel-admin">
          <div className="top-button">
            <button onClick={toggleFormVisibility}>
              {isFormVisible ? "Hide Travel Form" : "Add Travel"}
            </button>
          </div>
          {isFormVisible && (
            <div className="travel-table">
              <form onSubmit={handleDateSet}>
                <label htmlFor="vehicle">Vehicle No</label>
                <input
                  name="vehicleNo"
                  value={formData.vehicleNo}
                  onChange={(event) => populateForm(event)}
                  type="text"
                  placeholder="Enter vehicle number"
                  required
                />

                <label htmlFor="start">Start Location</label>
                <input
                  name="startLocation"
                  value={formData.startLocation}
                  onChange={(event) => populateForm(event)}
                  type="text"
                  placeholder="Enter your starting point"
                  required
                />

                <label htmlFor="destination">Destination</label>
                <input
                  name="destination"
                  value={formData.destination}
                  onChange={(event) => populateForm(event)}
                  type="text"
                  placeholder="Enter your destination point"
                  required
                />

                <label htmlFor="date">Date</label>
                <input
                  name="date"
                  value={formData.date}
                  onChange={(event) => populateForm(event)}
                  type="date"
                  placeholder="When is travel"
                  required
                />

                <label htmlFor="duration">Duration</label>
                <input
                  name="duration"
                  value={formData.duration}
                  onChange={(event) => populateForm(event)}
                  type="text"
                  placeholder="Enter expected duration time"
                  required
                />

                <label htmlFor="seats">Available Seats</label>
                <input
                  name="availableSeats"
                  value={formData.availableSeats}
                  onChange={(event) => populateForm(event)}
                  type="text"
                  placeholder="Enter total seat "
                  required
                />

                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={(event) => populateForm(event)}
                  placeholder="ENter price of seat"
                  required
                />

                <button type="submit">Set Travel</button>
              </form>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default TravelSet;
