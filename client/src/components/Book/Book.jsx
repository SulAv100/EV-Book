import React, { useState, useEffect } from "react";
import "./Book.css";
import Van from "../../assets/van.jpg";
import ExpandSeat from "../ExpandSeat/ExpandSeat";
import { useAuth } from "../../hooks/authContext";
const TripCard = ({
  imgSrc,
  handleSeat,
  isExpanded,
  item,
  userBookedSeats,
  otherBookedSeats,
  confirmedSeats,
  setUserBookedSeats,
}) => (
  <section className="outer-box">
    <div className="outer-container">
      <figure>
        <img src={imgSrc} alt="van" />
      </figure>
      <div className="left-book">
        <div className="destination">
          <div className="start-point">
            <span>5:00 AM</span>
            <span>{item.startLocation}</span>
          </div>
          <div className="time-lapse">
            <span>{item.duration}</span>
            <span>-----------------------------------------------</span>
          </div>
          <div className="start-point">
            <span>12:00 PM</span>
            <span>{item.destination}</span>
          </div>
        </div>
        <div className="time-facility">
          <div className="departure">
            <span>Date:</span>
            <p>{item.date}</p>
          </div>
          <div className="vehicle">
            <span>Vehicle:</span>
            <p>{item.vehicleNo}</p>
          </div>
          <div className="departure">
            <span>Seats available:</span>
            <p className="seats">{item.availableSeats}</p>
          </div>
        </div>
      </div>
      <div className="right-book">
        <div className="middle-box">
          <span>Per seat from</span>
          <span className="fare">
            <p>NPR</p>
            <p>{item.price}</p>
          </span>
          <button onClick={() => handleSeat(item.date, item.vehicleNo)}>
            Book Seats
          </button>
        </div>
      </div>
    </div>
    {isExpanded && (
      <ExpandSeat
        item={item}
        userBookedSeats={userBookedSeats}
        otherBookedSeats={otherBookedSeats}
        confirmedSeats={confirmedSeats}
        setUserBookedSeats={setUserBookedSeats}
      />
    )}
  </section>
);



function Book() {
  const [expandedSeats, setExpandedSeats] = useState([]);
  const [userBookedSeats, setUserBookedSeats] = useState({});
  const [otherBookedSeats, setOtherBookedSeats] = useState([]);
  const [confirmedSeats, setConfirmedSeats] = useState([]);
  const { fetchTravel, fetchData, userContact, getUserData } = useAuth();

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (fetchData && fetchData.length > 0) {
      setExpandedSeats(new Array(fetchData.length).fill(false));
    }
  }, [fetchData]);

  const handleSeat = async (index, date, vehicleNo) => {
    const updatedSeats = expandedSeats.map((seat, i) =>
      i === index ? !seat : seat
    );
    setExpandedSeats(updatedSeats);

    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/getBookData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ date, vehicleNo, userContact }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        const userBookedData = [];
        const otherBookedData = [];
        const confirmedData = [];

        if (data.userBooked && Array.isArray(data.userBooked)) {
          data.userBooked.forEach((booking) => {
            userBookedData.push(...booking.seatData);
          });
        }

        if (data.findBooked && Array.isArray(data.findBooked)) {
          data.findBooked.forEach((booking) => {
            otherBookedData.push(...booking.seatData);
          });
        }

        if (data.findConfirmed && Array.isArray(data.findConfirmed)) {
          data.findConfirmed.forEach((booking) => {
            confirmedData.push(...booking.seatData);
          });
        }

        // Update userBookedSeats by trip index
        setUserBookedSeats((prevState) => ({
          ...prevState,
          [index]: userBookedData, // Store data for the specific trip
        }));
        
        setOtherBookedSeats((prevState) => [...prevState, ...otherBookedData]);
        setConfirmedSeats((prevState) => [...prevState, ...confirmedData]);
      }
    } catch (error) {
      console.error("Error fetching booked seats:", error);
    }
  };

  useEffect(() => {
    fetchTravel();
  }, []);

  return (
    <>
      {fetchData?.map((item, index) => (
        <TripCard
          key={index}
          imgSrc={Van}
          handleSeat={(date, vehicleNo) => handleSeat(index, date, vehicleNo)}
          isExpanded={expandedSeats[index]}
          item={item}
          userBookedSeats={userBookedSeats[index] || []} // Pass only the relevant booked seats
          otherBookedSeats={otherBookedSeats}
          confirmedSeats={confirmedSeats}
          setUserBookedSeats={setUserBookedSeats} // Pass down the setter
        />
      ))}
    </>
  );
}

export default Book;