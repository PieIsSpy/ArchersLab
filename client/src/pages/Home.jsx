import { useState, useEffect } from "react";
import { Clock } from "../components/Clock";
import { Room } from "../models/Room";
import { ReservationTable } from "../components/ReservationTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../dark-datepicker.css";

import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export function Home () {
	const [loading, setLoading] = useState(true);

	const {currentUser} = useContext(UserContext)
	// console.log(currentUser)
	
	const [rooms, setRooms] = useState([]);
	const [filter, setFilter] = useState([]);
	const [filterBy, setFilterBy] = useState([]);

	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedRoom, setSelectedRoom] = useState(null);
	const [selectedUser, setSelectedUser] = useState(null);

	const handleDateChange = (newDate) => {
		setSelectedDate(newDate)
	};

	const fetchRooms = async () => {
		try {
			const roomsFetch = await fetch('http://localhost:5000/api/rooms');
			const roomsData = await roomsFetch.json();

			const roomInstances = roomsData
				.map(item => new Room(item._id, item.row, item.col, item.layout))
				.sort((a, b) => a.name.localeCompare(b.name));

			setRooms(roomInstances);
			
			setLoading(false);
		} catch (error) {
			console.error("Failed to fetch data:", error);
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchRooms()
	}, [])

	useEffect(() => {
		console.log (selectedDate)
		console.log (selectedRoom)
		console.log (selectedUser)
		setFilter([!!selectedDate, !!selectedRoom, !!selectedUser])
		setFilterBy([selectedDate,selectedRoom,selectedUser])
	}, [selectedDate, selectedRoom, selectedUser])

	const formcontrol =
		"gray-89 text-xl text-center px-3 h-10 w-43 rounded-xl bg-transparent " +
		"focus:outline-none focus:ring-2 focus:ring-[#145b92] focus:border-[#145b92] " +
		"selection:bg-blue-300 selection:text-black";

	if (loading) return <div className="mx-auto">Loading...</div>
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
							<div className="gap-2 flex flex-row items-center justify-center">
								<div className="text-xl google flex items-center justify-center">
									Date:
								</div>
								<div className="text-xl flex items-center justify-center">
									<DatePicker
										className={formcontrol}
										selected={selectedDate}
										onChange={handleDateChange}
										dateFormat="MM/dd/yyyy"
										placeholderText="Select a date..."
									/>
								</div>
								<div className="w-8 h-8 gray-89 rounded-lg"
									onClick={()=>setSelectedDate("")}>

									<svg viewBox="-2.5 0 61 61" xmlns="http://www.w3.org/2000/svg" fill="#c5c5c5" stroke="#c5c5c5"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><defs><filter id="a" width="200%" height="200%" x="-50%" y="-50%" filterUnits="objectBoundingBox"><feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feGaussianBlur stdDeviation="10" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" in="shadowBlurOuter1" result="shadowMatrixOuter1"></feColorMatrix><feMerge><feMergeNode in="shadowMatrixOuter1"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter></defs><path fill-rule="evenodd" d="M36 26v10.997c0 1.659-1.337 3.003-3.009 3.003h-9.981c-1.662 0-3.009-1.342-3.009-3.003v-10.997h16zm-2 0v10.998c0 .554-.456 1.002-1.002 1.002h-9.995c-.554 0-1.002-.456-1.002-1.002v-10.998h12zm-9-5c0-.552.451-1 .991-1h4.018c.547 0 .991.444.991 1 0 .552-.451 1-.991 1h-4.018c-.547 0-.991-.444-.991-1zm0 6.997c0-.551.444-.997 1-.997.552 0 1 .453 1 .997v6.006c0 .551-.444.997-1 .997-.552 0-1-.453-1-.997v-6.006zm4 0c0-.551.444-.997 1-.997.552 0 1 .453 1 .997v6.006c0 .551-.444.997-1 .997-.552 0-1-.453-1-.997v-6.006zm-6-5.997h-4.008c-.536 0-.992.448-.992 1 0 .556.444 1 .992 1h18.016c.536 0 .992-.448.992-1 0-.556-.444-1-.992-1h-4.008v-1c0-1.653-1.343-3-3-3h-3.999c-1.652 0-3 1.343-3 3v1z" filter="url(#a)"></path></g></svg>
								</div>
							</div>

							{/* Inner Div that holds ROOM */}
							<div className="gap-2 flex flex-row">
								<div className="text-xl google flex items-center justify-center">
									Room:
								</div>
								
								<select
									value={selectedRoom ? selectedRoom.name : "" }
									className={formcontrol}
									onChange={(e) => {
										const room = rooms.find(r => r.name === e.target.value);
										if (room) 
											setSelectedRoom(room.name)
										else 
											setSelectedRoom(null);
									}}
								>
									<option value="">Select room...</option>
									{rooms.map((room) => (
										<option value={room.name}>{room.name}</option>
									))}
								</select>
							</div>

							{/* Inner Div that holds NAME */}
							<div className="gap-2 flex flex-row items-center">
								<div className="text-xl google flex items-center justify-center">
									Name:
								</div>
								<input
									value={selectedUser}
									className={formcontrol}
									onChange={(e) => {
										setSelectedUser(e.target.value)
									}}
									placeholder="Input a user..."
								/>
								<div className="w-8 h-8 gray-89 rounded-lg"
									onClick={()=>setSelectedUser("")}>

									<svg viewBox="-2.5 0 61 61" xmlns="http://www.w3.org/2000/svg" fill="#c5c5c5" stroke="#c5c5c5"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><defs><filter id="a" width="200%" height="200%" x="-50%" y="-50%" filterUnits="objectBoundingBox"><feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feGaussianBlur stdDeviation="10" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" in="shadowBlurOuter1" result="shadowMatrixOuter1"></feColorMatrix><feMerge><feMergeNode in="shadowMatrixOuter1"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter></defs><path fill-rule="evenodd" d="M36 26v10.997c0 1.659-1.337 3.003-3.009 3.003h-9.981c-1.662 0-3.009-1.342-3.009-3.003v-10.997h16zm-2 0v10.998c0 .554-.456 1.002-1.002 1.002h-9.995c-.554 0-1.002-.456-1.002-1.002v-10.998h12zm-9-5c0-.552.451-1 .991-1h4.018c.547 0 .991.444.991 1 0 .552-.451 1-.991 1h-4.018c-.547 0-.991-.444-.991-1zm0 6.997c0-.551.444-.997 1-.997.552 0 1 .453 1 .997v6.006c0 .551-.444.997-1 .997-.552 0-1-.453-1-.997v-6.006zm4 0c0-.551.444-.997 1-.997.552 0 1 .453 1 .997v6.006c0 .551-.444.997-1 .997-.552 0-1-.453-1-.997v-6.006zm-6-5.997h-4.008c-.536 0-.992.448-.992 1 0 .556.444 1 .992 1h18.016c.536 0 .992-.448.992-1 0-.556-.444-1-.992-1h-4.008v-1c0-1.653-1.343-3-3-3h-3.999c-1.652 0-3 1.343-3 3v1z" filter="url(#a)"></path></g></svg>
								</div>
							</div>
						</div>
				</div>
				<div className="px-4 mt-4 rounded-2xl gray-67 shadow-lg">
					<ReservationTable
						filter = {filter}
						filterBy = {filterBy}
						mode={'global'}
					/>
				</div>
			</div>
		)
		// (
		// 	<div>
		// 		<h2 className="mt-12 font-black google text-4xl">Current Reservations</h2>
		// 		<div className="px-4 mt-4 rounded-2xl gray-67 shadow-lg">
		// 			<ReservationTable student={currentUser}/>
		// 		</div>
		// 	</div>
		// )
		}
		</div>
	);
}