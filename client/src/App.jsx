import { Routes, Route, Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";

// pages
import { Home } from "./pages/Home.jsx";
import { Profile } from "./pages/Profile.jsx";
import { ChangePassword } from "./pages/ChangePassword.jsx";
import { DeleteAccount } from "./pages/DeleteAccount.jsx";
import { ReserveSeat } from "./pages/ReserveSeat.jsx";
import { ReserveRoom } from "./pages/ReserveRoom.jsx";
import { AdminRegistration } from "./pages/admin/AdminRegistration.jsx";
import { UserRegistration } from "./pages/UserRegistration.jsx";
import { RoomReservations } from "./pages/admin/RoomReservations.jsx";
import { UserLogin } from "./pages/UserLogin.jsx";

import { currentUser } from "./models/User";

export default function App() {
	const [isAuth, setIsAuth] = useState(false);
	const [isAdmin, setAdmin] = useState(false);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		fetch('http://localhost:5000/api/auth/init', {
			method: 'GET',
			credentials: 'include'
		})
		.then(async res => {
			const isJson = res.headers.get('content-type')?.includes('application/json');
			const data = isJson ? await res.json() : await res.text();

			if (!res.ok) {
				throw new Error(typeof data === 'string' ? data : data.message)
			}
			return data;
		})
		.then(data => console.log(data))
		.catch(err => console.error(err))
	}, [])

	let choice = "flex flex-col items-center gap-2 rounded hover:bg-gray-700 transition"
	
	if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>

	if (!isAuth) {
		return (
			<Routes>
				<Route path='/' element={
					<div className="bg-[#00000060] h-screen w-screen">
						<img className="absolute z-0 h-screen w-screen top-0 left-0 blur-lg" src="src/resources/dlsu-jubilee.webp"></img>
						<div className="bg-[#000000AA] relative z-10 flex flex-col h-screen items-center justify-center">
							<h1 className="text-5xl google font-bold">Welcome to ArchersLab!</h1>
							<div>A lab reservation system that works for <span>you</span>.</div>

							<div className="mt-20 flex gap-8">
								<button 
									className="p-2 w-30 bg-[#145b92] rounded-xl select-none justify-center"
									onClick={() => navigate("/UserRegistration")}
								>
									Sign up
								</button>
								<button
									className="border w-30 p-2 rounded-xl flex justify-center"
									onClick={() => navigate("/UserLogin")}
								>
									Log in
								</button>
							</div>
						</div>
					</div>
				}/>
				<Route path="/UserLogin" element={<UserLogin setAuth={setIsAuth}/>} />
				<Route path="/UserRegistration" element={<UserRegistration />} />
				<Route path='*' element={<Navigate to='/'/>} />
			</ Routes>
		)
	}

	return (
		<>
			<div className="h-screen">
  				{location.pathname != "/" ?<div className="gray-67 w-20 h-full fixed top-0 left-0 flex flex-col justify-center items-center">
					
    				<nav className="flex flex-col items-center p-2">
						<ul className="flex flex-col w-full gap-10">
							<li>
								<Link
								to="/Dashboard"
								className={choice}
								>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
									className="w-5 h-5"
									fill="currentColor"
								>
									<path d="M256 0 L512 256 L448 256 L448 512 L288 512 L288 384 L224 384 L224 512 L64 512 L64 256 L0 256 Z" />
								</svg>
								<p className="text-xs text-center">Home</p>
								</Link>
							</li>

							<li>
								<Link
								to="/Profile"
								className={choice}
								>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									className="w-5 h-5"
								>
									<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
								</svg>
								<p className="text-xs text-center">Profile</p>
								</Link>
							</li>
						{ !isAdmin ? (
							<div className="flex flex-col w-full gap-10">
								<li>
									<Link
									to="/ReserveSeat"
									className={choice}
									>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="w-5 h-5"
									>
										<path d="M19 3H5c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
									</svg>
									<p className="text-xs text-center">Reserve a Seat</p>
									</Link>
								</li>

								<li>
									<Link
									to="/ReserveRoom"
									className={choice}
									>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="w-5 h-5"
									>
										<path d="M3 13h2v-2H3v2zm0-4h2V7H3v2zm4 4h14v-2H7v2zm0-4h14V7H7v2zm-4 8h2v-2H3v2zm4 0h14v-2H7v2z" />
									</svg>
									<p className="text-xs text-center">Request a Room</p>
									</Link>
								</li>
							</div>
						) : (
							<div className="flex flex-col w-full gap-10">
								<li>
									<Link
									to="/ReserveSeat"
									className={choice}
									>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="w-5 h-5"
									>
										<path d="M19 3H5c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
									</svg>
									<p className="text-xs text-center">In-Person Reservation</p>
									</Link>
								</li>

								<li>
									<Link
									to="/ReserveRoom"
									className={choice}
									>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="w-5 h-5"
									>
										<path d="M19 3H5c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
									</svg>
									<p className="text-xs text-center">In-Person Room Reservation</p>
									</Link>
								</li>

								<li>
									<Link
									to="/admin/RoomReservations"
									className={choice}
									>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="w-5 h-5"
									>
										<path d="M3 13h2v-2H3v2zm0-4h2V7H3v2zm4 4h14v-2H7v2zm0-4h14V7H7v2zm-4 8h2v-2H3v2zm4 0h14v-2H7v2z" />
									</svg>
									<p className="text-xs text-center">View Room Reservations</p>
									</Link>
								</li>
							</div>
						)

						}
						</ul>
					</nav>
				</div> : null}
				<div className={location.pathname != "/" ? "h-screen flex items-center ml-20" : "h-screen flex items-center"}>
					<Routes>
						<Route path="/Dashboard" element={<Home />} />
						<Route path="/Profile" element={<Profile />} />
						<Route path="/ChangePassword" element={<ChangePassword />} />
						<Route path="/DeleteAccount" element={<DeleteAccount />} />
						<Route path="/ReserveSeat" element={<ReserveSeat />} />
						<Route path="/ReserveRoom" element={<ReserveRoom />} />
						{
							isAdmin ? (
								<>
									<Route path="/admin/AdminRegistration" element={<AdminRegistration />} />
									<Route path="/admin/RoomReservations" element={<RoomReservations />} />
								</>
							): null
						}
						<Route path='*' element={<Navigate to='/Dashboard'/>}/>
					</Routes>
				</div>
			</div>
		</>
	)
}