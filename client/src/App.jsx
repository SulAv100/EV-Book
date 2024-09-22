import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Hero from "./pages/Hero/Hero";
import Footer from "./components/Footer/Footer";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import AdminLanding from "./pages/AdminLanding/AdminLanding";
import { useAuth } from "./hooks/authContext";

function App() {
  const { getAdminData, isAdmin } = useAuth();
  useEffect(() => {
    getAdminData();
  }, []);
  return (
    <>
      <NavBar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/adminLanding" element={<AdminLanding />} />
        </Routes>
      </div>
      {isAdmin ? <></> : <Footer />}
    </>
  );
}

export default App;
