import { useState, useEffect } from "react";
import { Clock } from "../components/Clock";
import { ReservationTable } from "../components/ReservationTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../dark-datepicker.css";

import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export function Home () {
	const {currentUser, loading} = useContext(UserContext)
	console.log(currentUser)
	
	const [rooms, setRooms] = useState([]);

	const [selectedDate, setSelectedDate] = useState(new Date());
	const [selectedRoom, setSelectedRoom] = useState(null);

	const handleDateChange = (newDate) => {
		setSelectedDate(newDate)
	};

	const fetchRooms = async () => {
		try {
			const response = await fetch('http://localhost:5000/api/rooms')

			const data = await response.json()
			setRooms(data)
		} catch (error) {
            console.error("Failed to fetch data:", error);
            // setLoading(false);
        }
	}

	useEffect(() => {
		fetchRooms()
	}, [])

	const optionRoom = [];
	for (let i = 0; i< rooms.length; i++){
		optionRoom.push(
			<option
				key={i}
				value={rooms[i]._id}
			>
				{rooms[i]._id}
			</option>
		);
	}

	const formcontrol =
		"gray-89 text-xl text-center px-3 h-10 w-43 rounded-xl bg-transparent " +
		"focus:outline-none focus:ring-2 focus:ring-[#145b92] focus:border-[#145b92] " +
		"selection:bg-blue-300 selection:text-black";

	if (loading) {
		return <div className="mx-auto">Loading...</div>
	}

    return (
		<div className="w-3/4 mx-auto">
			<div className="google p-4 rounded-2xl gray-67 shadow-lg flex items-center">
				<img
					className="rounded-full w-15 h-15 mr-5 object-cover"
					src={currentUser.pfp_url ? currentUser.pfp_url : "./src/resources/default.jpg"}
					alt="Profile"
				/>
				<div>
					<h2 className="font-bold text-xl">Good day, {currentUser.name}!</h2>
					<h2 className="text-gray-500 text-l mt-1"><Clock /></h2>
				</div>
			</div>
		{/* ADMIN SWITCH */}
		{!currentUser.isAdmin ? (
			<div>
				<h2 className="mt-12 font-black google text-4xl">Current Reservations</h2>
				<div className="px-4 mt-4 rounded-2xl gray-67 shadow-lg">
					<ReservationTable view={currentUser._id} mode={'profile'}/>
				</div>
			</div>
		):(
			<div>
				<h2 className="m-5 font-black google text-5xl">All Reservations</h2>
				{/* Outer Div that holds DATE ROOM TIMESLOT + REQ btn */}
				<div className="p-4 gray-67 flex flex-col rounded-2xl">
					<h2 className="google text-3xl text-gray-400 mb-3">Filter by</h2>
						{/* Inner Div that holds DATE ROOM TIMESLOT */}
						<div className="justify-center items-center rounded-2xl text-2xl google flex gap-12 w-full">
							
							{/* Inner Div that holds DATE */}
							<div className="gap-2 flex flex-row">
								<div className="text-xl google flex items-center justify-center">
									Date:
								</div>
								<div className="text-xl flex items-center justify-center">
									<DatePicker
										className={formcontrol}
										selected={selectedDate}
										onChange={handleDateChange}
										dateFormat="MM/dd/yyyy"
									/>
								</div>
							</div>

							{/* Inner Div that holds ROOM */}
							<div className="gap-2 flex flex-row">
								<div className="text-xl google flex items-center justify-center">
									Room:
								</div>
								
								<select
									value={selectedRoom?._id || ""}
									className={formcontrol}
									onChange={(e) => {
										const room = rooms.find(r => r.name === e.target.value);
										setSelectedRoom(room);
									}}
									>
									<option value="" disabled>
										Select room...
									</option>
									{optionRoom}
								</select>
							</div>

							{/* Inner Div that holds NAME */}
							<div className="gap-2 flex flex-row">
								<div className="text-xl google flex items-center justify-center">
									Name:
								</div>
								<input
									className={formcontrol}
								/>
							</div>
						</div>
				</div>
				<div className="px-4 mt-4 rounded-2xl gray-67 shadow-lg">
					<ReservationTable mode={'global'}/>
				</div>
			</div>
		)}
		</div>
	);
}