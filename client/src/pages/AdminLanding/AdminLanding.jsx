import React, { useEffect } from "react";
import AdminSide from "../../components/Admin/AdminSide/AdminSide";
import "./AdminLanding.css";
import { useAuth } from "../../hooks/authContext";
import { useNavigate } from "react-router-dom";

function AdminLanding() {
  const navigate = useNavigate();

  const { getAdminData, isAdmin } = useAuth();

  useEffect(() => {
    getAdminData();
    console.log(isAdmin);
  }, []);

  if (!isAdmin) {
    navigate("/");
  }

  return (
    <>
      <div className="admin-land">
        <AdminSide />
        hello
      </div>
    </>
  );
}

export default AdminLanding;
