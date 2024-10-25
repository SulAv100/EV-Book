import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import TravelImage from "../../assets/travel.png";
import "./Ticket.css";

function Ticket() {
  const { ticketId } = useParams();
  const [ticketData, setTicketData] = useState({});
  const [validCheck, setValidCheck] = useState("");

  useEffect(() => {
    if (ticketId) {
      fetchRespectiveTicketData();
    }
  }, [ticketId]);

  const fetchRespectiveTicketData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/getTicket",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ticketId: ticketId }),
        }
      );
      const data = await response.json();
      if (!response.ok) return console.log(response.statusText);

      setTicketData(data.ticketData);
      setValidCheck(data.Expired);
    } catch (error) {
      console.error(error);
    }
  };

  const saveTicketAsImage = () => {
    const element = document.getElementById("ticket-section");
    html2canvas(element).then((canvas) => {
      const link = document.createElement("a");
      link.download = "ticket.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Travel Ticket</h1>
      <section id="ticket-section" className="ticket-data">
        <div className="left-ticket">
          <div className="single-ticket">
            <label htmlFor="vehicleNo">VehicleNo</label>
            <input type="text" value={ticketData.vehicleNo} readOnly />
          </div>
          <div className="single-ticket">
            <label htmlFor="from">From</label>
            <input type="text" value={ticketData.startLocation} readOnly />
          </div>
          <div className="single-ticket">
            <label htmlFor="to">To</label>
            <input type="text" value={ticketData.destination} readOnly />
          </div>
          <div className="single-ticket">
            <label htmlFor="to">Seats</label>
            <input type="text" value={ticketData.seatData} readOnly />
          </div>
          <div className="single-ticket">
            <label htmlFor="date">Date</label>
            <input type="text" value={ticketData.date} readOnly />
          </div>
          <div className="single-ticket">
            <label htmlFor="status">Status</label>
            <input type="text" value={validCheck} readOnly />
          </div>
        </div>
        <div className="border-line"></div>
        <div className="right-section">
          <img src={TravelImage} alt="img" />
        </div>
      </section>
      <div className="save-btn-container">
        <button className="save-button" onClick={saveTicketAsImage}>
          Save Ticket as Image
        </button>
      </div>
      <h2
        style={{
          textAlign: "center",
          padding: "65px",
          color: "green",
          fontWeight: "800",
        }}
      >
        It's not just a ride, it's an adventure, so hold tight and enjoy
      </h2>
    </>
  );
}

export default Ticket;
