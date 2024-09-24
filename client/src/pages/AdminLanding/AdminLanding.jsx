import React, { useEffect } from "react";
import AdminSide from "../../components/Admin/AdminSide/AdminSide";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/authContext";
import "./AdminLanding.css";

function AdminLanding() {
  const navigate = useNavigate();
  const { getAdminData, isAdmin } = useAuth();

  useEffect(() => {
    getAdminData();
    if (!isAdmin) {
      navigate("/"); 
    }
  }, [getAdminData, isAdmin, navigate]);

  return (
    <div className="admin-land">
      <AdminSide />  
      <div className="admin-content">
        <Outlet />    
      </div>
    </div>
  );
}

export default AdminLanding;
