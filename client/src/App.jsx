import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Hero from "./pages/Hero/Hero";
import Footer from "./components/Footer/Footer";
import AdminLogin from "./components/AdminLogin/AdminLogin";

function App() {
  return (
    <>
      <NavBar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
