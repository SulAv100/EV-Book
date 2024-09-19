import React, { useState } from "react";
import "./NavBar.css";
import Logo from "../../assets/logo.jpg";

import { Link } from "react-router-dom";

function NavBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header>
        <div className="upper-layout">
          <Link to="/">
            <figure>
              <img src={Logo} alt="Logo" />
            </figure>
          </Link>
          <nav className={`nav-items ${isSidebarOpen ? "hidden" : ""}`}>
            <ul>
              <li>Offers</li>
              <li>Bookings</li>
              <Link to="/login">
                <li>
                  <button>Login/Signup</button>
                </li>
              </Link>
            </ul>
          </nav>
          <div className="hamburger" onClick={toggleSidebar}>
            <i className="fa fa-bars"></i>
          </div>
        </div>
        <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
          <div className="sidebar-content">
            <span className="closebtn" onClick={toggleSidebar}>
              &times;
            </span>
            <ul>
              <li>Offers</li>
              <li>Bookings</li>
              <Link to="/login">
                <li>
                  <button>Login/Signup</button>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}

export default NavBar;
