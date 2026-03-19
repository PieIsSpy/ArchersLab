import { useState, useEffect } from "react";
import { Clock } from "../components/Clock";
import { userJSON_to_Object, currentUser } from "../models/User";
import { ReservationTable } from "../components/ReservationTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../dark-datepicker.css";
import { Room } from "../models/Room";
import { Reservation } from "../models/Reservation";

export function Home () {
	const [rooms, setRooms] = useState([]);

	const [selectedDate, setSelectedDate] = useState(new Date());
	const [selectedTime, setSelectedTime] = useState("07:30-09:00");
	const [selectedRoom, setSelectedRoom] = useState(null);
	
	const [reservations, setReservations] = useState([])

	const [loading, setLoading] = useState(true);

	const timeSlots = [
		"07:30-09:00", "09:15-10:45", "11:00-12:30", "12:45-14:15", 
		"14:30-16:00", "16:15-17:45", "18:00-19:30",
	];

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const selected = new Date(selectedDate);
	selected.setHours(0, 0, 0, 0);

	const handleDateChange = (newDate) => {
		setSelectedDate(newDate)
	};

	const fetchReservations = async () => {
		const roomsUrl = 'http://localhost:5000/api/rooms';
		const reservationsUrl = 'http://localhost:5000/api/reservations';
		try {
			// fetch data
			const [roomsFetch, reservationsFetch] = await Promise.all([
				fetch(roomsUrl),
				fetch(reservationsUrl)
			])

			const roomsData = await roomsFetch.json();
			const reservationsData = await reservationsFetch.json();

			const roomInstances = roomsData.map(item =>
				new Room(item._id, item.row, item.col, item.layout)
			);
			setRooms(roomInstances);

			if (roomInstances.length > 0) {
				setSelectedRoom(roomInstances[0]);
			}

			const reservationInstances = reservationsData.map(res => {
				const userData = res.user ? res.user : res.inpersonInfo;
				
				return new Reservation(
					userJSON_to_Object(userData),
					new Date(res.date),
					res.time,
					roomInstances.find(r => r.name === (res.room._id)),
					res.seats,
					res.resStatus,
					res.reason,
					res.isAnonymous,
					res._id
				)
			});

			setReservations(reservationInstances)
			setLoading(false);
		} catch (error) {
			console.error("Failed to fetch data:", error);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchReservations();
	});

	useEffect(() => {
		// const takenSlots = reservations.filter(res => {
		// 	const isSameDate = res.date.toDateString() === selectedDate.toDateString();
		// 	const isSameRoom = res.room.name === selectedRoom.name;
		// 	const isSameTime = res.time === selectedTime;

		// 	return isSameDate && isSameRoom && isSameTime;
		// }).flatMap(res => res.seats);
	}, [selectedDate, selectedRoom, selectedTime, reservations]);

	const optionRoom = [];
	for (let i = 0; i< rooms.length; i++){
		optionRoom.push(
			<option
				key={i}
				value={rooms[i].name}
			>
				{rooms[i].name}
			</option>
		);
	}



	const formcontrol =
		"gray-89 text-xl text-center px-3 h-10 w-43 rounded-xl bg-transparent " +
		"focus:outline-none focus:ring-2 focus:ring-[#145b92] focus:border-[#145b92] " +
		"selection:bg-blue-300 selection:text-black";
    return (
		<div className="w-3/4 mx-auto">
			<div className="google p-4 rounded-2xl gray-67 shadow-lg flex items-center">
				<img
					className="rounded-full w-15 h-15 mr-5"
					src="./src/resources/karl.png"
					alt="Profile"
				/>
				<div>
					<h2 className="font-bold text-xl">Good day, {currentUser.name}!</h2>
					<h2 className="text-gray-500 text-l mt-1"><Clock /></h2>
				</div>
			</div>
		{/* ADMIN SWITCH */}
		{currentUser.isAdmin ? (
			<div>
				<h2 className="mt-12 font-black google text-4xl">Current Reservations</h2>
				<div className="px-4 mt-4 rounded-2xl gray-67 shadow-lg">
					<ReservationTable student={currentUser}/>
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
									value={selectedRoom?.name || ""}
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
					<ReservationTable/>
				</div>
			</div>
		)}
		</div>
	);
}