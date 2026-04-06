import { Routes, Route, Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";

// pages
import { About } from "./pages/About.jsx"
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

import { logoutAccount } from "./services/userServices.js";
import { initializeSession } from "./services/authServices.js";

import bg from './resources/dlsu-jubilee.webp'

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
			route: 'About',
			viewBox: '0 0 512 512',
			svg: "M256 0C114.88 0 0 114.88 0 256s114.88 256 256 256 256-114.88 256-256S397.12 0 256 0zm0 460c-112.16 0-204-91.84-204-204S143.84 52 256 52s204 91.84 204 204-91.84 204-204 204zm26 0h-53V240h53v220zm-26-288a26 26 0 1 1 0-52 26 26 0 0 1 0 52z"
		},
		{
			route: 'Home',
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
		const loadSession = async () => {
			setLoading(true)
			try {
				const data = await initializeSession();

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
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false)
			}
		}

		loadSession();
	}, [])

	const handleLogout = async () => {
		try {
			const response = await logoutAccount();

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
		<UserContext.Provider value={{currentUser: user, setUser, setIsAuth, setAdmin, isAdmin, loading}}>
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
								<div
								className={choice}
								onClick={()=> window.location.href = "https://github.com/PieIsSpy/ArchersLab/issues"}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="w-5 h-5"
										>
										<path d="M14.25,2.00136715 C14.6296958,2.00136715 14.943491,2.28352103 14.9931534,2.64959659 L15,2.75136715 L15,3.50347773 C15,4.13624402 14.804097,4.7232547 14.4696334,5.20716722 C15.8645632,5.68535677 16.8882898,6.96548052 16.9914278,8.49790266 L17.246874,8.49798466 C18.4895041,8.49284797 19.4926907,7.48133316 19.487554,6.23870309 L19.481413,4.7531069 C19.4797007,4.33889687 19.8140963,4.00172527 20.2283063,4 C20.6425163,3.99830081 20.9796879,4.33269635 20.9814001,4.74690637 L20.9876064,6.23250257 C20.9958261,8.23674461 19.4302454,9.88024484 17.4522099,9.99195062 L17.2375732,9.99800388 L17,9.99736715 L17,11.4993671 L21.2528443,11.5 C21.6325401,11.5 21.9463353,11.7821539 21.9959977,12.1482294 L22.0028443,12.25 C22.0028443,12.6296958 21.7206904,12.943491 21.3546149,12.9931534 L21.2528443,13 L17.0004071,12.9999993 L17,14.9993671 L17.2375732,15 L17.4522099,15.0060533 C19.3643109,15.1140355 20.8909958,16.6533946 20.9832254,18.566323 L20.9876064,18.7655013 L20.9814001,20.2510975 C20.9796879,20.6653075 20.6425163,20.9997031 20.2283063,20.9980103 C19.8486138,20.9964224 19.5359876,20.7129728 19.4878388,20.346695 L19.481413,20.244897 L19.487554,18.7593008 C19.4924766,17.568447 18.5713524,16.58985 17.4009,16.5058468 L17.246874,16.5000192 L16.7712708,16.4999516 C16.134308,18.5287878 14.2390223,20.0004991 12,20.0004991 C9.76097771,20.0004991 7.865692,18.5287878 7.22872923,16.4999516 L6.74073238,16.5000192 C5.49810231,16.5051559 4.49491571,17.5166707 4.50005239,18.7593008 L4.50619343,20.244897 C4.50790565,20.659107 4.17351012,20.9962786 3.7593001,20.9980103 C3.34509007,20.9997031 3.00791847,20.6653075 3.00620624,20.2510975 L3,18.7655013 C2.99178023,16.7612593 4.55736095,15.117759 6.53539647,15.0060533 L6.75003317,15 L7,14.9993671 L7,12.9993671 L2.75,13 C2.37030423,13 2.05650904,12.7178461 2.00684662,12.3517706 L2,12.25 C2,11.8703042 2.28215388,11.556509 2.64822944,11.5068466 L2.75,11.5 L7,11.4993671 L7,9.99736715 L6.75000069,9.99799738 L6.53536399,9.99194412 C4.62326299,9.88396187 3.09657809,8.34460281 3.00437787,6.43167443 L3,6.23249607 L3.00617377,4.74689988 C3.007886,4.33268985 3.3450576,3.99829432 3.75926762,4 C4.13896014,4.00157554 4.45158632,4.28502464 4.49973508,4.65130241 L4.50616095,4.7531004 L4.50001992,6.23869659 C4.49509726,7.42955041 5.41622151,8.40814733 6.58667387,8.4921506 L6.7406999,8.49797816 L7.00857223,8.49790266 C7.11171024,6.96548052 8.13543678,5.68535677 9.5313453,5.20593792 C9.23317441,4.77688617 9.04525672,4.26540284 9.00717835,3.71262483 L9,3.50347773 L9,2.75136715 C9,2.33715358 9.33578644,2.00136715 9.75,2.00136715 C10.1296958,2.00136715 10.443491,2.28352103 10.4931534,2.64959659 L10.5,2.75136715 L10.5,3.50347773 C10.5,4.33190486 11.1715729,5.00347773 12,5.00347773 C12.7796961,5.00347773 13.4204487,4.40858965 13.4931334,3.64793774 L13.5,3.50347773 L13.5,2.75136715 C13.5,2.33715358 13.8357864,2.00136715 14.25,2.00136715 Z" />
									</svg>
									<p className="text-xs text-center">Report Issues</p>
								</div>
							</li>

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

				<div className={location.pathname != "/" && location.pathname != "/UserLogin" && location.pathname != "/UserRegistration" ? "h-screen flex items-center ml-20" : "h-screen flex items-center"}>
					<Routes>
						<Route path='/' element={
							loading ? (
								<div className="h-screen flex items-center justify-center">Loading...</div>
							) : !isAuth ? (
								<div className="bg-[#00000060] h-screen w-screen">
									<img className="absolute z-0 h-screen w-screen top-0 left-0 blur-lg" src={bg}></img>
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
								<Navigate to='/Home'/> 
							)
						}/>
						<Route path="/UserLogin" element={
							isAuth ? <Navigate to='/Home'/> : (
							<UserLogin 
								setIsAuth={setIsAuth}
								setAdmin={setAdmin}
								setUser={setUser}
							/>
							)
						} />
						<Route path="/UserRegistration" element={
							isAuth ? <Navigate to='/Home'/> : <UserRegistration />
						} />
						<Route path="/About" element={<About/>} />
						<Route path="/Home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
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

                        <Route path="*" element={<Navigate to={isAuth ? "/Home" : "/"} />} />
					</Routes>
				</div>
			</div>
		</UserContext.Provider>
	)
}