import { useState, useEffect} from "react";

import { InpersonModal } from "../components/Modals";
import { Button, DarkDatePicker, Picker } from "../components/Input";

import { useContext } from "react";
import { UserContext } from "../context/UserContext";

import { fetchRooms } from "../services/roomServices";
import { fetchFilteredReservations, fetchReservations } from "../services/reservationServices";
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
				// const reservationData = await fetchReservations();
				const reservationData = await fetchFilteredReservations(
					{
						redactAnonymous: true
					}
				)
				
				roomData.sort((a, b) => a._id.localeCompare(b._id))

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
			if (res.time === selectedTime &&
				new Date(res.date).toDateString() === selectedDate.toDateString() && 
				res.room._id === selectedRoom._id &&
				res.resStatus === "Approved") // No seats (Full room reservation)
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

		if (reservations.find((res) => 
			new Date(res.date).toDateString() === selectedDate.toDateString() && 
			res.time === selectedTime && 
			res.room.name === selectedRoom.name && 
			res.resStatus === "Approved")) {
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
				alert("Request Successful! Please await for your request to be approved...")
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
		if (reservations.find((res) => 
				res.time === selectedTime &&
				new Date(res.date).toDateString() === selectedDate.toDateString() && 
				res.room._id === selectedRoom._id &&
				res.resStatus === "Approved")) {
			alert('The room is already reserved by someone else')
			
		}
		else {
			setOpen(true)
		}
	}

	if (loading || !selectedRoom || rooms.length === 0) return <div className="mx-auto">Loading...</div>
	return(
	<div className="w-full min-h-screen flex justify-center items-center">
		<div className="flex flex-col justify-center items-center rounded-2xl gap-3">
			<div className="mr-100">
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
							<DarkDatePicker
								selected={selectedDate}
								onChange={(date) => setSelectedDate(date)}
								minDate={minDate}
								maxDate={maxDate}
							/>

							<Picker 
								label="Room:"
								value={selectedRoom._id}
								onChange={(e) => {
										const newRoom = rooms.find(r => r._id === e.target.value);
										setSelectedRoom(newRoom);
								}}
								children={optionRoom}
							/>
							
							<Picker 
								label="Timeslot:"
								value={selectedTime}
								onChange={(e) => {
										setSelectedTime(e.target.value);
								}}
								children={timeSlotOptions}
							/>
						</div>
						<div className="mt-5 text-xl google flex items-center">
							Reason:
						</div>
						<textarea rows="2" placeholder="Please insert reason here" className=
  							"w-full p-3 rounded-xl gray-89 text-l font-['Inter',sans-serif] box-border focus:outline-none focus:ring-2 focus:ring-[#145b92] focus:border-[#145b92] selection:bg-blue-300 selection:text-black"
						type="text" id="reason-textarea" maxLength="100"></textarea>
					</div>
					{/* Reserve btn */}
					<Button
						label="Request Room Reservation"
						onClick={() => {
							if (currentUser.isAdmin)
								handleModal()
							else
								reserveRoom()
						}}
					/>
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