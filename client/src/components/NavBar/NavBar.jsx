import React, { useState, useEffect } from "react";
import "./NavBar.css";
import Logo from "../../assets/logo.jpg";
import { useAuth } from "../../hooks/authContext";

import { Link } from "react-router-dom";

function NavBar() {
  const { getUserData, userData } = useAuth();

  useEffect(() => {
    getUserData();
  }, []);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data.msg);
        window.location.reload();
        return;
      }
      console.log("Try again");
    } catch (error) {
      console.error(error);
    }
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
              {userData ? (
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              ) : (
                <Link to="/login">
                  <li>
                    <button>Login/Signup</button>
                  </li>
                </Link>
              )}
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
              {userData ? (
                <li>{userData}</li>
              ) : (
                <Link to="/login">
                  <li>
                    <button>Login/Signup</button>
                  </li>
                </Link>
              )}
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}

export default NavBar;
