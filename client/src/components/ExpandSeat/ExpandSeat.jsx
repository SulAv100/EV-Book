import React from "react";
import "./ExpandSeat.css";
import steering from "../../assets/steering-wheel.png";

function ExpandSeat() {
  const seats = [
    { type: "Adult", seat: "A1", price: "Rs 600.00" },
    { type: "Adult", seat: "A2", price: "Rs 600.00" },
    { type: "Adult", seat: "B1", price: "Rs 600.00" },
    { type: "Adult", seat: "C1", price: "Rs 600.00" },
    { type: "Adult", seat: "C2", price: "Rs 600.00" },
    // Add more seats as needed
  ];

  return (
    <>
      <section className="seat-select">
        <div className="left-seat-info">
          <div className="wheel">
            <img src={steering} alt="Steering Wheel" />
          </div>
          <div className="single-seat">
            <button>A1</button>
            <button>C1</button>
          </div>
          <div className="single-seat">
            <button>A2</button>
            <button>B1</button>
            <button>C2</button>
          </div>
          <div className="single-seat">
            <button>A3</button>
            <button>B2</button>
            <button>C3</button>
          </div>
          <div className="single-seat">
            <button>A4</button>
            <button>B3</button>
            <button>C4</button>
          </div>
        </div>
        <div className="right-pricing">
          <table>
            <thead>
              <tr>
                <th>Seat Type</th>
                <th>Seat</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {seats.map((seat, index) => (
                <tr key={index}>
                  <td>{seat.type}</td>
                  <td>{seat.seat}</td>
                  <td>{seat.price}</td>
                  <td><button className="del-seat">Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total">
            <span>Total: Rs {seats.reduce((acc, seat) => acc + parseFloat(seat.price.split(' ')[1]), 0).toFixed(2)}</span>
            <button className="book-now">Book Now</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default ExpandSeat;
