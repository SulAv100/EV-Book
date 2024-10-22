import React, { useState, useEffect } from "react";
import "./Book.css";
import Van from "../../assets/van.jpg";
import ExpandSeat from "../ExpandSeat/ExpandSeat";
import { useAuth } from "../../hooks/authContext";

const TripCard = ({
  imgSrc,
  fetchData,
  handleSeat,
  isExpanded,
  item,
  userBookedSeats,
  userBookingId,
  otherBookedSeats,
  confirmedSeats,
  setUserBookedSeats,
  showCloseButton,
  onCloseClick,
}) => {
  useEffect(() => {
    console.log(fetchData);
  }, [fetchData]);
  return (
    <>
      <section className="outer-box">
        <div className="outer-container">
          <figure>
            <img src={imgSrc} alt="van" />
          </figure>
          <div className="left-book">
            <div className="destination">
              <div className="start-point">
                <span>{item.departTime}</span>
                <span>{item.startLocation}</span>
              </div>
              <div className="time-lapse">
                <span>{item.duration}</span>
                <span>-----------------------------------------------</span>
              </div>
              <div className="start-point">
                <span>{item.droppingTime}</span>
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
                <span>Total Seats:</span>
                <p className="seats">{item.availableSeats}</p>
              </div>
            </div>
          </div>
          <div className="right-book">
            <div className="middle-box">
              <span>Per seat fare</span>
              <span className="fare">
                <p>NPR</p>
                <p>{item.price}</p>
              </span>
              {showCloseButton ? (
                <button onClick={onCloseClick}>Close</button>
              ) : (
                <button onClick={() => handleSeat(item.date, item.vehicleNo)}>
                  Book Seats
                </button>
              )}
            </div>
          </div>
        </div>
        {isExpanded && (
          <ExpandSeat
            item={item}
            userBookedSeats={userBookedSeats}
            userBookingId={userBookingId}
            otherBookedSeats={otherBookedSeats}
            confirmedSeats={confirmedSeats}
            setUserBookedSeats={setUserBookedSeats}
          />
        )}
      </section>
    </>
  );
};

function Book({ formData, displayError }) {
  const [expandedSeats, setExpandedSeats] = useState([]);
  const [userBookedSeats, setUserBookedSeats] = useState({});
  const [otherBookedSeats, setOtherBookedSeats] = useState([]);
  const [confirmedSeats, setConfirmedSeats] = useState([]);
  const { fetchTravel, fetchData, userContact, getUserData } = useAuth();

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (formData) {
      console.log(formData);
    }
  }, [formData]);

  useEffect(() => {
    if (fetchData && fetchData.length > 0) {
      setExpandedSeats(new Array(fetchData.length).fill(false));
    }
  }, [fetchData]);
  const handleSeat = async (index, date, vehicleNo) => {
    // Close all seats first
    const updatedSeats = new Array(expandedSeats.length).fill(false);
    updatedSeats[index] = true; // Set the clicked seat to true
    setExpandedSeats(updatedSeats);

    // Clear seat data for the selected trip only, not for all trips
    setUserBookedSeats((prevState) => ({
      ...prevState,
      [index]: {
        seats: [], // Clear seat data for this specific trip
        bookingIds: [], // Clear booking IDs for this specific trip
      },
    }));

    // Clear other seats and confirmed seats only for this trip
    setOtherBookedSeats([]);
    setConfirmedSeats([]);

    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/getBookData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ formData, date, vehicleNo, userContact }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log(data);

        let userBookedData = [];
        let userBookingIds = [];
        let otherBookedData = [];
        let confirmedData = [];

        if (data.userBooked && Array.isArray(data.userBooked)) {
          data.userBooked.forEach((booking) => {
            userBookedData.push(...booking.seatData);
            userBookingIds.push(booking._id); // Get booking ID
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

        // Update the seat data for the current trip (index)
        setUserBookedSeats((prevState) => ({
          ...prevState,
          [index]: {
            seats: userBookedData,
            bookingIds: userBookingIds,
          },
        }));

        // Update other booked and confirmed seats
        setOtherBookedSeats(otherBookedData);
        setConfirmedSeats(confirmedData);

        console.log("Booking IDs for trip index", index, ":", userBookingIds);
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
      {fetchData?.length > 0 ? (
        <>
          {fetchData?.map((item, index) => (
            <TripCard
              key={index}
              imgSrc={Van}
              handleSeat={(date, vehicleNo) =>
                handleSeat(index, date, vehicleNo)
              }
              isExpanded={expandedSeats[index]}
              item={item}
              fetchData={fetchData}
              userBookedSeats={userBookedSeats[index]?.seats || []}
              userBookingId={userBookedSeats[index]?.bookingIds[0] || null}
              otherBookedSeats={otherBookedSeats}
              confirmedSeats={confirmedSeats}
              setUserBookedSeats={setUserBookedSeats}
            />
          ))}
        </>
      ) : (
        <>
          {displayError ? (
            <h1
              style={{
                color: "red",
              }}
            >
              No Rides Found For This Route
            </h1>
          ) : (
            <>
              <h2>Search Rides That You Want</h2>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Book;
