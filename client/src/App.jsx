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
import AdminDash from "./components/Admin/AdminDash/AdminDash";
import TravelSet from "./components/Admin/TravelSet/TravelSet";
import BookSeat from "./components/Admin/BookSeat/BookSeat";
import BookingPage from "./pages/Payment/BookingPage";
import DisplayTravel from "./components/Admin/DisplayTravel/DisplayTravel";
import ConfirmBook from "./components/Admin/ConfirmBook/ConfirmBook";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import FinishTravel from "./components/Admin/FinishTravel/FInishTravel";
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
          {/* Public/User Routes */}
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/bookingpage" element={<BookingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/adminLogin" element={<AdminLogin />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLanding />}>
            <Route path="/admin" element={<AdminDash />} />
            <Route path="travelAdmin" element={<TravelSet />} />
            <Route path="bookData" element={<BookSeat />} />
            <Route path="displayTravel" element={<DisplayTravel />} />
            <Route path="finishTravel" element={<FinishTravel />} />
            <Route path="confirmBook" element={<ConfirmBook />} />
          </Route>
        </Routes>
      </div>
      {isAdmin ? <></> : <Footer />}
    </>
  );
}

export default App;
