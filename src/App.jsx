import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";

// pages
import { Home } from "./pages/Home.jsx";
import { Profile } from "./pages/Profile.jsx";
import { Reservations } from "./pages/Reservation.jsx";
import { ChangePassword } from "./pages/ChangePassword.jsx";
import { DeleteAccount } from "./pages/DeleteAccount";
import { RequestRoom } from "./pages/RequestRoom";

export default function App() {
	return ( 
		<Router>
			<div>
				<nav className="p-5 flex items-center border-b border-gray-700">
					<h1 className="text-2xl font-bold google">
						ArchersLab <span className="bg-linear-to-r from-cyan-500 to-blue-500
						bg-clip-text text-transparent animate-pulse">2</span>
					</h1>

					<Link className="ml-10 text-l font" to="/">
						Dashboard
					</Link>

					<Link className="ml-10 text-l font" to="/Profile">
						Profile
					</Link>

					<Link className="ml-10 text-l font" to="/Reservations">
						Reservations
					</Link>

					<Link className="ml-10 text-l font" to="/RequestRoom">
						Request Room
					</Link>

					<Link className="ml-auto text-l font" to="/Logout">
						Log Out
					</Link>
				</nav>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/Profile" element={<Profile />} />
					<Route path="/Reservations" element={<Reservations />} />
					<Route path="/ChangePassword" element={<ChangePassword />} />
					<Route path="/DeleteAccount" element={<DeleteAccount />} />
					<Route path="/RequestRoom" element={<RequestRoom />} />
				</Routes>
			</div>
		</Router>
	);
}