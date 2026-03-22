import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { logout } from "../features/auth/services/authService.js";

const NAV_ITEMS = [
  {
    route: "Home",
    viewBox: "0 0 512 512",
    svg: "M256 0 L512 256 L448 256 L448 512 L288 512 L288 384 L224 384 L224 512 L64 512 L64 256 L0 256 Z",
  },
  {
    route: "Profile",
    viewBox: "0 0 24 24",
    svg: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
  },
  {
    route: "ReserveSeat",
    alt_name: "Seat Reservation",
    viewBox: "0 0 24 24",
    svg: "M19 3H5c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z",
  },
  {
    route: "ReserveRoom",
    alt_name: "Room Reservation",
    viewBox: "0 0 24 24",
    svg: "M3 13h2v-2H3v2zm0-4h2V7H3v2zm4 4h14v-2H7v2zm0-4h14V7H7v2zm-4 8h2v-2H3v2zm4 0h14v-2H7v2z",
  },
];

const itemClass = "flex flex-col items-center gap-2 rounded hover:bg-gray-700 transition";

function NavItem({ item, userId }) {
  const to = item.route === "Profile" ? `/Profile/${userId}` : `/${item.route}`;
  return (
    <li>
      <Link to={to} className={itemClass}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox={item.viewBox}>
          <path d={item.svg} />
        </svg>
        <p className="text-[10px] text-center leading-tight">{item.alt_name ?? item.route}</p>
      </Link>
    </li>
  );
}

function AdminNavItem() {
  return (
    <li>
      <Link to="/admin/RoomReservations" className={itemClass}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M3 13h2v-2H3v2zm0-4h2V7H3v2zm4 4h14v-2H7v2zm0-4h14V7H7v2zm-4 8h2v-2H3v2zm4 0h14v-2H7v2z" />
        </svg>
        <p className="text-xs text-center">View Room Reservations</p>
      </Link>
    </li>
  );
}

function LogoutItem({ onLogout }) {
  return (
    <li>
      <button className={itemClass} onClick={onLogout}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        <p className="text-xs text-center">Log Out</p>
      </button>
    </li>
  );
}

export function Navbar() {
  const { currentUser, isAdmin, setUser, setIsAuth, setAdmin } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setAdmin(false);
    setIsAuth(false);
    setUser(null);
    navigate("/");
  };

  return (
    <div className="gray-67 w-20 h-full fixed top-0 left-0 flex flex-col justify-center items-center">
      <nav className="flex flex-col items-center p-2">
        <ul className="flex flex-col w-full gap-10">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.route} item={item} userId={currentUser._id} />
          ))}
          {isAdmin && <AdminNavItem />}
          <LogoutItem onLogout={handleLogout} />
        </ul>
      </nav>
    </div>
  );
}
