import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

// const [time, setTime] = useState(new Date());

// useEffect(() => {
// 	const timer = setInterval(() => {
// 		setTime(new Date());
// }, 1000);

// // Cleanup interval on unmount
// return () => clearInterval(timer);
// }, []);

// // Format time as HH:MM:SS AM/PM
// const formatTime = (date) => {
// const year = date.getFullYear();
// const month = date.toLocaleString('default', { month: 'long' });
// const day = date.getDate();
// const hours = date.getHours();
// const minutes = date.getMinutes();
// const seconds = date.getSeconds();
// const ampm = hours >= 12 ? " PM" : " AM";
// const h12 = hours % 12 || 12; // convert 0 -> 12
// return `It is currently ${month} ${day}, ${year}, ${h12.toString().padStart(2, "0")}:${minutes
// 	.toString()
// 	.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}${ampm}`;
// };

function Home () {
	return (
	<div className="m-5">
		<div className="google">
			<h2 className="font-bold text-xl">Good day, John!</h2>
			{/* <h2 className="ml-auto text-gray-500 text-l">{formatTime(time)}</h2> */}
		</div>
		<h2 className="mt-12 font-black google text-4xl">Current Reservations:</h2>
		<div className="mt-4 pl-4 pr-4 rounded-2xl grayy shadow-lg">
			<table className="table-auto w-full text-left">
				<thead class="font-bold border-b border-gray-600">
					<tr>
						<th>
							Date
						</th>
						<th>
							Time
						</th>
						<th>
							Room
						</th>
						<th>
							Capacity
						</th>
						<th>
							Seats Reserved
						</th>
						<th>
							Status
						</th>
						<th>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr className="border-b border-gray-600">
						<td>
							2/16/2025
						</td>
						<td>
							6:00AM-7:00AM
						</td>
						<td>
							GK201
						</td>
						<td>
							30/41
						</td>
						<td>
							1 1, 1 2
						</td>
						<td>
							Cancelled
						</td>
						<td className="flex items-center gap-2 ">
							<button className="ml-auto flex items-center gap-2 text-red-400 hover:text-red-600 hover:scale-105 transition-all duration-200">
								Cancel
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="20px"
									width="20px"
									viewBox="0 -960 960 960"
									className="flex-shrink-0"
								>
									<path
									d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z"
									fill="currentColor"
									/>
								</svg>
							</button>
						</td>
					</tr>
					
					<tr>
						<td>
							2/16/2025
						</td>
						<td>
							6:00AM-7:00AM
						</td>
						<td>
							GK201
						</td>
						<td>
							30/41
						</td>
						<td>
							1 1, 1 2
						</td>
						<td>
							Cancelled
						</td>
						<td className="flex items-center gap-2 ">
							<button className="ml-auto flex items-center gap-2 text-red-400 hover:text-red-600 hover:scale-105 transition-all duration-200">
								Cancel
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="20px"
									width="20px"
									viewBox="0 -960 960 960"
									className="flex-shrink-0"
								>
									<path
									d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z"
									fill="currentColor"
									/>
								</svg>
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>);
}

function Profile() {
	return <h2>Profile</h2>;
}

export default function App() {
	return ( 
		<Router>
			<div>	
				<nav class="p-5 flex items-center border-b border-gray-700">
					<h1 class="text-2xl font-bold google">
							ArchersLab <span class="bg-linear-to-r from-cyan-500 to-blue-500
								bg-clip-text text-transparent animate-pulse">2</span>
					</h1>
					<a class="ml-10 text-l font" href="/">
							Dashboard
					</a>
					<a class="ml-10 text-l font" href="profile">
							Profile
					</a>
					<a class="ml-10 text-l font">
							Reservations
					</a>
					<a class="ml-10 text-l font">
							Request Room
					</a>
					<a class="ml-auto text-l font">
							Log Out
					</a>
				</nav>
				<Routes>
					<Route path="/profile" element={<Profile />} />
					<Route path="/" element={<Home />} />
				</Routes>
			</div>
		</Router>
	);
}