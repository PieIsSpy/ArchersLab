import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";

// pages
import { Home } from "./pages/Home.jsx";
import { Profile } from "./pages/Profile.jsx";
import { Reservations } from "./pages/Reservation.jsx";
import { ChangePassword } from "./pages/ChangePassword.jsx";
import { DeleteAccount } from "./pages/DeleteAccount";

export default function App() {
	return ( 
		<Router>
			<div>	
				<nav className="p-5 flex items-center border-b border-gray-700">
					<h1 className="text-2xl font-bold google">
							ArchersLab <span className="bg-linear-to-r from-cyan-500 to-blue-500
								bg-clip-text text-transparent animate-pulse">2</span>
					</h1>
					<a className="ml-10 text-l font" href="/">
							Dashboard
					</a>
					<a className="ml-10 text-l font" href="Profile">
							Profile
					</a>
					<a className="ml-10 text-l font" href="Reservations">
							Reservations
					</a>
					<a className="ml-10 text-l font">
							Request Room
					</a>
					<a className="ml-auto text-l font">
							Log Out
					</a>
				</nav>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/Profile" element={<Profile />} />
					<Route path="/Reservations" element={<Reservations />} />
					<Route path="/ChangePassword" element={<ChangePassword />} />
					<Route path="/DeleteAccount" element={<DeleteAccount />} />
				</Routes>
			</div>
		</Router>
	);
}