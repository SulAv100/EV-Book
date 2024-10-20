import React, { useState } from "react";
import "./contact.css";

const Contact = () => {
  const [isOpen, setIsOpen] = useState(null);
  const toggleDropdown = (num) => {
    console.log("clicked");

    setIsOpen(isOpen === num ? null : num);
  };

  return (
    <div className="main-contact-div">
      <section className="question">
        <div className="question-container">
          <div className="faq">
            <h4>Important Information</h4>
          </div>

          <div className="one">
            <div className="show-div" onClick={() => toggleDropdown(0)}>
              <button className="toggle-button">
                {" "}
                {isOpen === 0 ? "-" : "+"}
              </button>
              <p>Travel Policy</p>
            </div>

            <div className={`hide-div ${isOpen === 0 ? "open" : ""}`}>
              <p>
                Luggage charges are not included in the bus ticket. Full fare
                will be charged for children above 5 years of age. Baby seats
                are not available on our vehicles. Pets are not allowed on board
                our vehicles.
              </p>
            </div>

            <div className="show-div" onClick={() => toggleDropdown(1)}>
              <button className="toggle-button">
                {" "}
                {isOpen === 1 ? "-" : "+"}
              </button>
              <p>Your Responsibilities as a Passenger</p>
            </div>

            <div className={`hide-div ${isOpen === 1 ? "open" : ""}`}>
              <p>
                Keep your ticket with you for the whole journey. If you lose it,
                you will need to buy a new one. Be at the boarding point 30
                minutes before departure. If you're late and miss the bus,
                BusSewa.com cannot and will not be held responsible. Check your
                ticket for the correct AM or PM time. No refunds will be
                provided if you miss the bus because of such confusion.
                Passengers must follow the terms and conditions of the bus
                company/association.
              </p>
            </div>
            <div className="show-div" onClick={() => toggleDropdown(2)}>
              <button className="toggle-button">
                {" "}
                {isOpen === 2 ? "-" : "+"}
              </button>
              <p>What Our Service Can and Can't Do </p>
            </div>

            <div className={`hide-div ${isOpen === 2 ? "open" : ""}`}>
              <p>
                Bus services might be canceled or rescheduled because of things
                like bad weather, strikes, or other incidents. If this happens,
                we will inform you. If a bus is canceled due to these reasons,
                our usual cancellation policy does not apply. We will provide
                you another option if you are interested. If a bus is
                rescheduled for similar reasons, you can cancel your ticket for
                a full refund, minus payment gateway charges.
              </p>
            </div>
            <div className="show-div" onClick={() => toggleDropdown(3)}>
              <button className="toggle-button">
                {" "}
                {isOpen === 3 ? "-" : "+"}
              </button>
              <p>Ticket Cancellation Terms & Conditions</p>
            </div>

            <div className={`hide-div ${isOpen === 3 ? "open" : ""}`}>
              <p>
                BusSewa.com offers refunds for cancellations made up to 12 hours
                before departure, unless the operator has a seperate
                cancellation policy in place. Charges for cancellation will be
                applied as follows:(If you purchase your Ticket on Baisakh 1
                2081 and the bus departs on 10th Baisakh 8:00 AM then) Cancel
                before 48 hours of departure: no cancellation fee. (if you
                cancel before 8:00 AM on 8th Baisakh) Cancel between 48 and 24
                hours before departure: 25% cancellation fee. (25% charge if you
                cancel from 8:00 AM on 8th Baisakh to 8:00 AM on 9th Baisakh)
                Cancel 24 to 12 hours before departure: 50% cancellation fee
                (50% charge if you cancel from 8:00 AM on 9th Baisakh to 8:00 PM
                on 9th Baisakh).
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
