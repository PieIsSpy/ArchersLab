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
			<div className="gray-67 w-20 h-full absolute fixed top-0 left-0">
				<nav className="flex flex-col items-center p-3">
					<div className="mb-48">
						<svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>airplane</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-310.000000, -309.000000)" fill="#ffffff"> <path d="M341.207,309.82 C339.961,308.57 337.771,308.863 336.518,310.119 L330.141,316.481 L318.313,312.061 C317.18,311.768 316.039,311.389 314.634,312.798 C313.917,313.516 312.427,315.01 314.634,317.221 L322.744,323.861 L317.467,329.127 L312.543,327.896 C311.813,327.708 311.321,327.855 310.946,328.269 C310.757,328.505 309.386,329.521 310.342,330.479 L316.067,334.933 L320.521,340.658 C321.213,341.352 321.856,340.919 322.735,340.084 C323.292,339.526 323.172,339.239 323.004,338.426 L321.892,333.536 L327.133,328.277 L333.763,336.389 C335.969,338.6 337.46,337.105 338.177,336.389 C339.583,334.979 339.205,333.837 338.912,332.702 L334.529,320.854 L340.88,314.481 C342.133,313.226 342.454,311.069 341.207,309.82" id="airplane" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>						<h1 className="text-m font-bold">
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