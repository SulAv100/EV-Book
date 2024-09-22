import React, { useState } from "react";
import "./AdminSide.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/authContext";

function AdminSide() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const {isAdmin, setIsAdmin} = useAuth();

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
      console.log("Error has occured");
    } catch (error) {
      console.log("Network error occured");
    }
  };

  return (
    <>
      <aside>
        <ul>
          <li>
            <i class="fa-solid fa-house"></i>
            <p>Dashboard</p>
          </li>
          <li>
            <i class="fa-regular fa-calendar-days"></i>
            <p>Date Manager</p>
          </li>
          <li>
            <i class="fa-solid fa-book"></i>
            <p>Seat Booking</p>
          </li>
          <li onClick={handleAdminLogout}>
            <i class="fa-solid fa-right-from-bracket"></i>
            <p>Logout</p>
          </li>
        </ul>
      </aside>
    </>
  );
}

export default AdminSide;
