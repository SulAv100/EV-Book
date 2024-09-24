import React, { useState } from "react";
import "./TravelSet.css";

function TravelSet() {
  const [isFormVisible, setIsFormVisible] = useState(false);

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
            <form>
              <label htmlFor="vehicle">Vehicle No</label>
              <input type="text" placeholder="Enter vehicle number" />

              <label htmlFor="start">Start Location</label>
              <input type="text" placeholder="Enter your starting point" />

              <label htmlFor="destination">Destination</label>
              <input type="text" placeholder="Enter your destination point" />

              <label htmlFor="date">Date</label>
              <input type="date" placeholder="When is travel" />

              <label htmlFor="duration">Duration</label>
              <input type="text" placeholder="Enter expected duration time" />

              <label htmlFor="seats">Available Seats</label>
              <input type="text" placeholder="Enter total seat " />

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
