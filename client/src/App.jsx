import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";

// pages
import { Home } from "./pages/Home.jsx";
import { Profile } from "./pages/Profile.jsx";
import { Reservations } from "./pages/Reservation.jsx";
import { ChangePassword } from "./pages/ChangePassword.jsx";
import { DeleteAccount } from "./pages/DeleteAccount.jsx";
import { RequestRoom } from "./pages/RequestRoom.jsx";
import { AdminRegistration } from "./pages/admin/AdminRegistration.jsx";
import { IndividualReservations } from "./pages/admin/IndividualReservations.jsx";
import { RoomReservations } from "./pages/admin/RoomReservations.jsx";

export default function App() {
	return ( 
		<Router>
		<div className="h-screen">
			<div className="gray-67 w-22 h-full absolute fixed top-0 left-0">
				<nav className="flex flex-col items-start p-3">
					<div className="flex flex-col pl-1 py-2 mb-48">
						<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						className="scale-90"
						fill="currentColor"
						>
						<path d="M15.502 20A6.523 6.523 0 0 1 12 23.502 6.523 6.523 0 0 1 8.498 20h2.26c.326.489.747.912 1.242 1.243.495-.33.916-.754 1.243-1.243h2.259zM18 14.805l2 2.268V19H4v-1.927l2-2.268V9c0-3.483 2.504-6.447 6-7.545C15.496 2.553 18 5.517 18 9v5.805zM17.27 17L16 15.56V9c0-2.318-1.57-4.43-4-5.42C9.57 4.57 8 6.681 8 9v6.56L6.73 17h10.54zM12 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
						</svg>
						<h1 className="text-2xl font-bold ">
						AL{" "}
						<span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
							2
						</span>
						</h1>
					</div>
					<ul className="flex flex-col gap-4 w-full">

						<li>
							<Link
							to="/"
							className="flex flex-col items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 transition"
							>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 512 512"
								className="w-5 h-5"
								fill="currentColor"
							>
								<path d="M256 0 L512 256 L448 256 L448 512 L288 512 L288 384 L224 384 L224 512 L64 512 L64 256 L0 256 Z" />
							</svg>
							<p className="text-xs">Home</p>
							</Link>
						</li>

						<li>
							<Link
							to="/Profile"
							className="flex flex-col items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 transition"
							>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="w-5 h-5"
							>
								<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
							</svg>
							<p className="text-xs">Profile</p>
							</Link>
						</li>

						<li>
							<Link
							to="/Reservations"
							className="flex flex-col items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 transition"
							>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="w-5 h-5"
							>
								<path d="M19 3H5c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
							</svg>
							<p className="text-xs">Reserve</p>
							</Link>
						</li>

						<li>
							<Link
							to="/RequestRoom"
							className="flex flex-col items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 transition"
							>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="w-5 h-5"
							>
								<path d="M3 13h2v-2H3v2zm0-4h2V7H3v2zm4 4h14v-2H7v2zm0-4h14V7H7v2zm-4 8h2v-2H3v2zm4 0h14v-2H7v2z" />
							</svg>
							<p className="text-xs text-center">Request Room</p>
							</Link>
						</li>
					</ul>
				</nav>
			</div>
			<div className="ml-24">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/Profile" element={<Profile />} />
					<Route path="/Reservations" element={<Reservations />} />
					<Route path="/ChangePassword" element={<ChangePassword />} />
					<Route path="/DeleteAccount" element={<DeleteAccount />} />
					<Route path="/RequestRoom" element={<RequestRoom />} />
      				<Route path="/admin/AdminRegistration" element={<AdminRegistration />} />
      				<Route path="/admin/IndividualReservations" element={<IndividualReservations />} />
      				<Route path="/admin/RoomReservations" element={<RoomReservations />} />
				</Routes>
			</div>
		</div>
		</Router>
	);
}