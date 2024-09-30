import React, { useState } from "react";
import "./AdminSide.css";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../hooks/authContext";

function AdminSide() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const { isAdmin, setIsAdmin } = useAuth();

  const handleAdminLogout = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/adminLogout",
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setIsAdmin(false);
        navigate("/");
        return;
      }
      console.log("Error has occurred");
    } catch (error) {
      console.log("Network error occurred");
    }
  };

  const menuItems = [
    { path: "/admin", icon: "fa-solid fa-house", label: "Dashboard" }, // Home dashboard
    {
      path: "/admin/travelAdmin",
      icon: "fa-solid fa-calendar-days",
      label: "Date Manager", // Calendar for managing dates
    },
    {
      path: "/admin/bookData",
      icon: "fa-solid fa-chair",
      label: "Seat Booking", // Seat or chair for booking seats
    },
    {
      path: "/admin/displayTravel",
      icon: "fa-solid fa-route",
      label: "Display Travel", // Route to display travel plans
    },
    {
      path: "/admin/confirmBook",
      icon: "fa-solid fa-check-circle",
      label: "Confirm Booking", // Checkmark for confirmation
    },
    {
      path: "/admin/finishTravel",
      icon: "fa-solid fa-flag-checkered",
      label: "Finished Travel", // Flag for completed travel
    },
  ];

  return (
    <aside>
      <ul>
        {menuItems.map((item, index) => (
          <Link to={item.path} key={index}>
            <li
              className={active === index ? "active" : ""}
              onClick={() => setActive(index)}
            >
              <i className={`fa-solid ${item.icon}`}></i>
              <p>{item.label}</p>
            </li>
          </Link>
        ))}
        <li onClick={handleAdminLogout}>
          <i className="fa-solid fa-right-from-bracket"></i>
          <p>Logout</p>
        </li>
      </ul>
    </aside>
  );
}

export default AdminSide;
