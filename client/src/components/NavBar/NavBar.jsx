import React, { useState, useEffect } from "react";
import "./NavBar.css";
import Logo from "../../assets/logo.jpg";
import { useAuth } from "../../hooks/authContext";

import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const { getUserData, userData, getAdminData, isAdmin } = useAuth();

  useEffect(() => {
    getUserData();
  }, []);
  useEffect(() => {
    getAdminData();
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
        navigate("/");
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
          {isAdmin ? (
            <figure>
              <img src={Logo} alt="Logo" />
            </figure>
          ) : (
            <Link to="/">
              <figure>
                <img src={Logo} alt="Logo" />
              </figure>
            </Link>
          )}
          <nav className={`nav-items ${isSidebarOpen ? "hidden" : ""}`}>
            <ul>
              {isAdmin ? (
                <></>
              ) : (
                <>
                  {isAdmin ? (
                    <></>
                  ) : (
                    <>
                      {userData ? (
                        <Link to="/profile">
                          {" "}
                          <li>Profile</li>
                        </Link>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </>
              )}
              {userData ? (
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              ) : (
                <>
                  {isAdmin ? (
                    <></>
                  ) : (
                    <Link to="/login">
                      <li>
                        <button>Login/Signup</button>
                      </li>
                    </Link>
                  )}
                </>
              )}
            </ul>
          </nav>
          {isAdmin ? (
            <></>
          ) : (
            <div className="hamburger" onClick={toggleSidebar}>
              <i className="fa fa-bars"></i>
            </div>
          )}
        </div>
        {isAdmin ? (
          <></>
        ) : (
          <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
            <div className="sidebar-content">
              <span className="closebtn" onClick={toggleSidebar}>
                &times;
              </span>
              <ul>
                {isAdmin ? (
                  <></>
                ) : (
                  <>
                    {userData ? (
                      <Link to="/profile">
                        {" "}
                        <li>Profile</li>
                      </Link>
                    ) : (
                      <></>
                    )}
                  </>
                )}
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
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export default NavBar;
