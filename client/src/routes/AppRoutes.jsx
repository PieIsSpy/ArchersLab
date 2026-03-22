import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { ProtectedRoute } from "./ProtectedRoute";
import { Navbar } from "../components/Navbar";

import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";
import { ChangePassword } from "../pages/ChangePassword";
import { DeleteAccount } from "../pages/DeleteAccount";
import { ReserveSeat } from "../pages/ReserveSeat";
import { ReserveRoom } from "../pages/ReserveRoom";
import { UserLogin } from "../pages/UserLogin";
import { UserRegistration } from "../pages/UserRegistration";
import { AdminRegistration } from "../pages/admin/AdminRegistration";
import { RoomReservations } from "../pages/admin/RoomReservations";

const AUTH_PATHS = ["/", "/UserLogin", "/UserRegistration"];

export function AppRoutes({ isAuth, isAdmin, setIsAuth, setAdmin, setUser }) {
  const location = useLocation();
  const showNav = isAuth && !AUTH_PATHS.includes(location.pathname);
  const mainClass = showNav ? "h-screen flex items-center ml-20" : "h-screen flex items-center";

  return (
    <div className="h-screen">
      {showNav && <Navbar />}
      <div className={mainClass}>
        <Routes>
          <Route path="/" element={
            !isAuth ? (
              <LandingPage />
            ) : (
              <Navigate to="/Home" />
            )
          } />

          <Route path="/UserLogin" element={
            isAuth ? <Navigate to="/Home" /> : <UserLogin setIsAuth={setIsAuth} setAdmin={setAdmin} setUser={setUser} />
          } />
          <Route path="/UserRegistration" element={
            isAuth ? <Navigate to="/Home" /> : <UserRegistration />
          } />

          <Route path="/Home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/Profile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/ReserveSeat" element={<ProtectedRoute><ReserveSeat /></ProtectedRoute>} />
          <Route path="/ReserveRoom" element={<ProtectedRoute><ReserveRoom /></ProtectedRoute>} />
          <Route path="/ChangePassword" element={<ChangePassword />} />

          {!isAdmin && <Route path="/DeleteAccount" element={<DeleteAccount />} />}

          {isAdmin && (
            <>
              <Route path="/admin/AdminRegistration" element={<ProtectedRoute><AdminRegistration /></ProtectedRoute>} />
              <Route path="/admin/RoomReservations" element={<ProtectedRoute><RoomReservations /></ProtectedRoute>} />
            </>
          )}

          <Route path="*" element={<Navigate to={isAuth ? "/Home" : "/"} />} />
        </Routes>
      </div>
    </div>
  );
}

function LandingPage() {
  const { } = useContext(UserContext);
  return (
    <div className="bg-[#00000060] h-screen w-screen">
      <img className="absolute z-0 h-screen w-screen top-0 left-0 blur-lg" src="/src/resources/dlsu-jubilee.webp" alt="" />
      <div className="bg-[#000000AA] relative z-10 flex flex-col h-screen items-center justify-center">
        <h1 className="text-5xl google font-bold">Welcome to ArchersLab!</h1>
        <div>A lab reservation system that works for <span>you</span>.</div>
        <div className="mt-20 flex gap-8">
          <a href="/UserRegistration">
            <button className="p-2 w-30 bg-[#145b92] rounded-xl select-none">Sign up</button>
          </a>
          <a href="/UserLogin">
            <button className="border w-30 p-2 rounded-xl flex justify-center">Log in</button>
          </a>
        </div>
      </div>
    </div>
  );
}
