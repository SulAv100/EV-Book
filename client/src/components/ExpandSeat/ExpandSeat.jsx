import React, { useEffect, useState } from "react";
import "./ExpandSeat.css";
import steering from "../../assets/steering-wheel.png";
import { useAuth } from "../../hooks/authContext";
import { useNavigate } from "react-router-dom";

function ExpandSeat({ item }) {
  const navigate = useNavigate();
  // Parse localStorage seats value or default to an empty array if it's null
  const [bookedSeat, setBookedSeat] = useState([]);

  useEffect(() => {
    let seatData = JSON.parse(localStorage.getItem("seats"));
    if (seatData === undefined) {
      seatData = "[]";
    }
    setBookedSeat(seatData);
  }, []);

  const { getUserData, userData, userContact } = useAuth();

  const handleBooking = (seatName) => {
    if (!userData) {
      alert("Please login first");
      navigate("/login");
      return;
    } else if (!bookedSeat.includes(seatName)) {
      setBookedSeat((prevState) => [...prevState, seatName]);
    } else {
      setBookedSeat((prevState) =>
        prevState.filter((seat) => seat !== seatName)
      );
    }
  };

  const handleDelete = (seatName) => {
    setBookedSeat((prevState) => prevState.filter((seat) => seat !== seatName));
  };

  const total = bookedSeat.reduce((acc, data) => acc + parseInt(item.price), 0);

  useEffect(() => {
    getUserData();
  }, []);
  useEffect(() => {
    console.log(userData);
  }, [userData]);

  useEffect(() => {
    localStorage.setItem("seats", JSON.stringify(bookedSeat));
  }, [bookedSeat]);

  const handleBookFetch = () => {
    localStorage.setItem(
      "book",
      JSON.stringify({
        seatType: "Adult",
        seatData: bookedSeat,
        price: bookedSeat.length * item.price,
        vehicleNo: item.vehicleNo,
        startLocation: item.startLocation,
        departTime: item.departTime,
        destination: item.destination,
        droppingTime: item.droppingTime,
        date: item.date,
        phoneNumber: userContact,
      })
    );
    navigate("/bookingpage");
  };

  return (
    <>
      <section className="seat-select">
        <div className="left-seat-info">
          <div className="wheel">
            <img src={steering} alt="Steering Wheel" />
          </div>
          <div className="single-seat">
            <button
              className={bookedSeat.includes("A1") ? "selected" : ""}
              onClick={() => handleBooking("A1")}
            >
              A1
            </button>
            <button
              className={bookedSeat.includes("C1") ? "selected" : ""}
              onClick={() => handleBooking("C1")}
            >
              C1
            </button>
          </div>
          <div className="single-seat">
            <button
              className={bookedSeat.includes("A2") ? "selected" : ""}
              onClick={() => handleBooking("A2")}
            >
              A2
            </button>
            <button
              className={bookedSeat.includes("B1") ? "selected" : ""}
              onClick={() => handleBooking("B1")}
            >
              B1
            </button>
            <button
              className={bookedSeat.includes("C2") ? "selected" : ""}
              onClick={() => handleBooking("C2")}
            >
              C2
            </button>
          </div>
          <div className="single-seat">
            <button
              className={bookedSeat.includes("A3") ? "selected" : ""}
              onClick={() => handleBooking("A3")}
            >
              A3
            </button>
            <button
              className={bookedSeat.includes("B2") ? "selected" : ""}
              onClick={() => handleBooking("B2")}
            >
              B2
            </button>
            <button
              className={bookedSeat.includes("C3") ? "selected" : ""}
              onClick={() => handleBooking("C3")}
            >
              C3
            </button>
          </div>
          <div className="single-seat">
            <button
              className={bookedSeat.includes("A4") ? "selected" : ""}
              onClick={() => handleBooking("A4")}
            >
              A4
            </button>
            <button
              className={bookedSeat.includes("B3") ? "selected" : ""}
              onClick={() => handleBooking("B3")}
            >
              B3
            </button>
            <button
              className={bookedSeat.includes("C4") ? "selected" : ""}
              onClick={() => handleBooking("C4")}
            >
              C4
            </button>
          </div>
        </div>
        <div className="right-pricing">
          <table>
            {bookedSeat?.length >= 1 ? (
              <>
                {" "}
                <thead>
                  <tr>
                    <th>Seat Type</th>
                    <th>Seat</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
              </>
            ) : (
              <></>
            )}
            <tbody>
              {bookedSeat?.map((seat, index) => (
                <tr key={index}>
                  <td>Adult</td>
                  <td>{seat}</td>
                  <td>{item.price}</td>
                  <td>
                    <button
                      className="del-seat"
                      onClick={() => handleDelete(seat)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {bookedSeat?.length >= 1 ? (
            <>
              <div className="total">
                <span>Total: Rs {total}</span>
                <button onClick={handleBookFetch} className="book-now">
                  Book Now
                </button>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </section>
    </>
  );
}

export default ExpandSeat;
