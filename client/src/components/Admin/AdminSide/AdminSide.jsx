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
    { path: "/admin", icon: "fa-house", label: "Dashboard" },
    { path: "/admin/travelAdmin", icon: "fa-calendar-days", label: "Date Manager" },
    { path: "/admin/bookData", icon: "fa-book", label: "Seat Booking" },
    {path:"/admin/displayTravel", icon: "fa-book",label:"Display Travel"}
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
