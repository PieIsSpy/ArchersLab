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
import { UserContext } from "./context/UserContext.jsx";

export default function App() {
	const [isAuth, setIsAuth] = useState(false);
	const [isAdmin, setAdmin] = useState(false);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const navigate = useNavigate();
	const location = useLocation();

	const ProtectedRoute = ({children}) => {
		if (loading) return <div className="h-screen flex items-center justify-center">Authenticating...</div>;
		if (!isAuth) return <Navigate to='/' />
		return children;
	}

	const navBarElems = [
		{
			route: 'Dashboard',
			viewBox: '0 0 512 512',
			svg: 'M256 0 L512 256 L448 256 L448 512 L288 512 L288 384 L224 384 L224 512 L64 512 L64 256 L0 256 Z'
		},
		{
			route: 'Profile',
			viewBox: '0 0 24 24',
			svg: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'
		},
		{
			route: 'ReserveSeat',
			alt_name: 'Seat Reservation',
			viewBox: '0 0 24 24',
			svg: 'M19 3H5c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z'
		},
		{
			route: 'ReserveRoom',
			alt_name: 'Room Reservation',
			viewBox: '0 0 24 24',
			svg: 'M3 13h2v-2H3v2zm0-4h2V7H3v2zm4 4h14v-2H7v2zm0-4h14V7H7v2zm-4 8h2v-2H3v2zm4 0h14v-2H7v2z'
		}
	]

	useEffect(() => {
		setLoading(true)
		fetch('http://localhost:5000/api/auth/init', {
			method: 'GET',
			credentials: 'include'
		})
		.then(res => {
			if (!res.ok) return {isAuth: false}
			return res.json();
		})
		.then(data => {
			console.log(data)
			if (data.isAuth) {
				setUser(data.user)
				setAdmin(data.user?.isAdmin || false);
				setIsAuth(true);
			}
			else {
				setUser(null);
				setIsAuth(false);
				setAdmin(false);
			}
		})
		.catch(err => console.error(err))
		.finally(() => setLoading(false))
	}, [])

	const handleLogout = async () => {
		try {
			const response = await fetch('http://localhost:5000/api/users/logout', {
				method: 'POST',
				credentials: 'include'
			})

			if (response.ok) {
				setAdmin(false)
				setIsAuth(false)
				setUser(null)

				navigate('/')
			}
		} catch (err) {
			console.log(err)
		}
	}

	let choice = "flex flex-col items-center gap-2 rounded hover:bg-gray-700 transition"
	
	if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>

	return (
		<UserContext.Provider value={{currentUser: user, setUser, isAdmin, loading}}>
			<div className="h-screen">
			{isAuth && location.pathname !== '/' ? (
				<div className="gray-67 w-20 h-full fixed top-0 left-0 flex flex-col justify-center items-center">
				<nav className="flex flex-col items-center p-2">
					<ul className="flex flex-col w-full gap-10">
					{navBarElems.map((elem) => (
						<li key={elem.route}>
							<Link 
							to={elem.route === 'Profile' ? `/${elem.route}/${user._id}` : `/${elem.route}`}
							className={choice}
							>
								<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox={elem.viewBox}>
									<path d={elem.svg}/>
								</svg>
								<p className="text-[10px] text-center leading-tight">
									{elem.alt_name ? elem.alt_name : elem.route}
								</p>
							</Link>
						</li>
					))}

					{isAdmin && (
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
					)}

						<li>
							<Link
							className={choice}
							onClick={handleLogout}
							>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
								<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
							</svg>
							<p className="text-xs text-center">Log Out</p>
							</Link>
						</li>
					</ul>
				</nav>
				</div>
			) : null}

				<div className={location.pathname != "/" ? "h-screen flex items-center ml-20" : "h-screen flex items-center"}>
					<Routes>
						<Route path='/' element={
							loading ? (
								<div className="h-screen flex items-center justify-center">Loading...</div>
							) : !isAuth ? (
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
							) : (
								<Navigate to='/Dashboard'/> 
							)
						}/>
						<Route path="/UserLogin" element={
							isAuth ? <Navigate to='/Dashboard'/> : (
							<UserLogin 
								setIsAuth={setIsAuth}
								setAdmin={setAdmin}
								setUser={setUser}
							/>
							)
						} />
						<Route path="/UserRegistration" element={
							isAuth ? <Navigate to='/Dashboard'/> : <UserRegistration />
						} />
						
						<Route path="/Dashboard" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                        <Route path="/Profile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                        <Route path="/ReserveSeat" element={<ProtectedRoute><ReserveSeat /></ProtectedRoute>} />
                        <Route path="/ReserveRoom" element={<ProtectedRoute><ReserveRoom /></ProtectedRoute>} />
                        <Route path="/ChangePassword" element={<ChangePassword />} />

						{!isAdmin && (
							<Route path="/DeleteAccount" element={<DeleteAccount />} />
						)

						}
						
                        {isAdmin && (
                            <>
                                <Route path="/admin/AdminRegistration" element={<ProtectedRoute><AdminRegistration /></ProtectedRoute>} />
                                <Route path="/admin/RoomReservations" element={<ProtectedRoute><RoomReservations /></ProtectedRoute>} />
                            </>
                        )}

                        <Route path="*" element={<Navigate to={isAuth ? "/Dashboard" : "/"} />} />
					</Routes>
				</div>
			</div>
		</UserContext.Provider>
	)
}