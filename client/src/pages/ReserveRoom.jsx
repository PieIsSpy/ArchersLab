import { useState, useEffect} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../dark-datepicker.css";
import { InpersonModal } from "../components/Modals";

import { useContext } from "react";
import { UserContext } from "../context/UserContext";

import { fetchRooms } from "../services/roomServices";
import { fetchReservations } from "../services/reservationServices";
import { createReservation } from "../services/reservationServices";

const timeSlots = [
	"07:30-09:00", "09:15-10:45", "11:00-12:30", "12:45-14:15", 
	"14:30-16:00", "16:15-17:45", "18:00-19:30",
];

export function ReserveRoom(){
	const {currentUser} = useContext(UserContext)

	// helper
	function basedate(d = new Date()) {
		const date = new Date(d);
		date.setHours(8, 0, 0, 0);
		return date;
	}

	// date limits
	const today = basedate();
	
	const minDate = today;
	minDate.setDate(minDate.getDate() + 14);

	const maxDate = new Date(today);
	maxDate.setDate(maxDate.getDate() + 31);

	// date selection
	const [selectedDate, setSelectedDate] = useState(() => minDate);
	
	const [open, setOpen] = useState(false);
	const [rooms, setRooms] = useState([]);

	const [selectedTime, setSelectedTime] = useState(null);
	const [selectedRoom, setSelectedRoom] = useState(null);

	const [reservations, setReservations] = useState([])

	const [loading, setLoading] = useState(true);

	const [timeSlotOptions, setTimeSlotOptions] = useState([]);

	useEffect(() => {
		const loadData = async() => {
			setLoading(true);
			try {
				const roomData = await fetchRooms();
				const reservationData = await fetchReservations();
				
				setRooms(roomData)
				setReservations(reservationData)
				setSelectedRoom(roomData[0])
			} catch (err) {
				console.error(err)
			} finally {
				setLoading(false)
			}
		}

		loadData();
	}, []);

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

	useEffect(() => {
		var tempTimeSlots = [...timeSlots]

		if (selectedRoom) 
			console.log(selectedRoom._id)

		reservations.forEach(res => {
			if (new Date(res.date).toDateString() === selectedDate.toDateString() && // Same day
				res.room.name === selectedRoom.name && // Same room
				res.seats.length === 0 &&
				res.resStatus === "Cancelled") // No seats (Full room reservation)
				{
					tempTimeSlots.splice(tempTimeSlots.indexOf(res.time),1); // Temporarily remove from timeslot
				}
		});

		console.log(tempTimeSlots)

		setTimeSlotOptions(
			tempTimeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)
		);

		setSelectedTime(tempTimeSlots[0] || null);

	}, [selectedDate, selectedRoom, reservations]); // only runs when date or room change

	async function reserveRoom(inpersonInfo = null) {
		console.log("selectedtime:"+selectedTime)
		console.log("selectedate:"+selectedDate)

		if (!document.getElementById("reason-textarea").value){
			alert('Reason field is empty. Please provide a valid reason.')
			return
		}

		reservations.forEach((res)=>console.log(new Date(res.date).toDateString()))
		console.log(selectedDate.toDateString())
		console.log(reservations)

		if (reservations.find((res) => new Date(res.date).toDateString() === selectedDate.toDateString() && res.time === selectedTime && res.room.name === selectedRoom.name)) {
			alert('The room is already reserved by someone else')
			return
		}
		
		const newReservation = {
			user: !inpersonInfo ? currentUser._id : null,
			date: selectedDate.toISOString(),
			time: selectedTime,
			room: selectedRoom._id,
			seats: [],
			resStatus: "Pending",
			reason: document.getElementById("reason-textarea").value,
			isAnonymous: false,
			inpersonInfo: inpersonInfo
		};

		try {
			const response = await createReservation(newReservation)

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message || 'Reservation Failed')
			}
			else {
				const reservationData = await fetchReservations();
				setReservations(reservationData)
				alert("Reservation Successful!")
			}
		} catch (err) {
			console.error("Error:", err);
		}
		
		document.getElementById("reason-textarea").value = '';
		console.log(`
			User has reserved room for
			Date: ${selectedDate.toLocaleDateString()}
			Time: ${selectedTime}
			Room: ${selectedRoom.name}
		`);
	}

	const handleModal = () => {
		if (!reservations.find((res) => 
				res.time === selectedTime &&
				new Date(res.date).toDateString() === selectedDate.toDateString() && 
				res.room.name === selectedRoom.name)) {
			setOpen(true)
		}
		else {
			alert('The room is already reserved by someone else')
		}
	}

	if (loading || !selectedRoom || rooms.length === 0) return <div className="mx-auto">Loading...</div>
	return(
	<div className="w-full min-h-screen flex justify-center items-center">
		<div className="flex flex-col justify-center items-center rounded-2xl gap-3">
			<div className="mr-70">
				<div className="google text-5xl font-bold ">
					Request a room
				</div>
				<div className="google mt-2 text-gray-400">
					Do note that each reservation must be made 14-31 days in advance.<br/>
					All requests are subject for approval.
				</div>
			</div>

			{/* Outer Div that holds DATE ROOM TIMESLOT + REQ btn */}
			<div className="flex flex-col justify-center items-center rounded-2xl gap-8">
					{/* Inner Div that holds DATE ROOM TIMESLOT */}
					<div className="flex flex-col gray-67 rounded-2xl text-2xl google p-6">
						<div className="flex justify-center items-center gap-x-12">
							{/* Inner Div that holds DATE */}
							<div className="gap-2 flex flex-row">
								<div className="text-xl google flex items-center justify-center">
									Date:
								</div>
								<div className="text-xl w-[150px] flex items-center justify-center">
									<DatePicker
										className="gray-89 text-xl w-full p-3 rounded-lg text-center
										focus:outline-none focus:ring-2 focus:ring-[#145b92]
										focus:border-[#145b92] selection:bg-blue-300 selection:text-black"
										selected={selectedDate}
										onChange={(date) => setSelectedDate(date)}
										minDate={minDate}
										maxDate={maxDate}
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
									className = "text-xl gray-89 text-center"
									style={{
										width: "120px",
										height: "50px",
										borderRadius: "8px",
										padding: "6px 10px",
									}}
									value={selectedRoom._id}
									onChange={(e) => {
										const newRoom = rooms.find(r => r._id === e.target.value);
										setSelectedRoom(newRoom);
									}}
								>
								{optionRoom}
								</select>
							</div>

							{/* Inner Div that holds TIMESLOT */}
							<div className="gap-2 flex flex-row">
								<div className="text-xl google flex items-center justify-center">
									Timeslot:
								</div>
								<select
								className = "text-xl gray-89"
								style={{
									width: "160px",
									height: "50px",
									borderRadius: "8px",
									padding: "6px 10px",
								}}
								value={selectedTime}
								onChange={(e) => 
									setSelectedTime(e.target.value)
								}
								>
									{timeSlotOptions}
								</select>
							</div>
						</div>
						<div className="mt-5 text-xl google flex items-center">
							Reason:
						</div>
						<textarea rows="2" placeholder="Please insert reason here" className=
  							"w-full p-3 rounded-xl gray-89 text-l font-['Inter',sans-serif] box-border focus:outline-none focus:ring-2 focus:ring-[#145b92] focus:border-[#145b92] selection:bg-blue-300 selection:text-black"
						type="text" id="reason-textarea" maxLength="100"></textarea>
					</div>
					{/* Reserve btn */}
					<div className="bg-[#145b92] p-3 rounded-xl transition-all hover:scale-110 active:scale-105 active:bg-[#02497F] active:shadow-inner select-none"
						onClick={() => {
							if (currentUser.isAdmin)
								handleModal()
							else
								reserveRoom()
						}}
					>
						Request Room Reservation
					</div>
					<InpersonModal
						open={open}
						onClose={() => setOpen(false)}
						onConfirm={(info) => reserveRoom(info)}
					/>
			</div>
		</div>
	</div>

	);
}