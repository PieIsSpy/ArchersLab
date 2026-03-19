import { useState, useEffect} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../dark-datepicker.css";
import { Room } from "../models/Room";
import { Reservation } from "../models/Reservation";
import { userJSON_to_Object, currentUser } from "../models/User";
import { InpersonModal } from "../components/Modals";

export function ReserveRoom(){
	const timeSlots = [
		"07:30-09:00", "09:15-10:45", "11:00-12:30", "12:45-14:15", 
		"14:30-16:00", "16:15-17:45", "18:00-19:30",
	];
	const room = [
		"A1904", "C314", "G210", "G211", "G302A",
		"G302B", "G304A", "G304B", "G306A", "G306B", "G404A", "G404B",
		"J212", "L212", "L229", "L320", "L335", "V103", "V205", "V206", 
		"V208A", "V208B", "V301", "V310", "Y602"
	];

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const [selectedDate, setSelectedDate] = useState(
		new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000)
	);

	const minDate = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
	const maxDate = new Date(today.getTime() + 31 * 24 * 60 * 60 * 1000);
	
	const [open, setOpen] = useState(false);
	const [rooms, setRooms] = useState([]);

	const [selectedTime, setSelectedTime] = useState("07:30-09:00");
	const [selectedRoom, setSelectedRoom] = useState(null);

	const [reservations, setReservations] = useState([])

	const [loading, setLoading] = useState(true);

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
			console.log(reservationInstances)
			setLoading(false);
		} catch (error) {
			console.error("Failed to fetch data:", error);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchReservations();
	}, []);

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

	const timeSlotOptions = [];
	for (let i = 0; i<timeSlots.length;i++){
		timeSlotOptions.push(
			<option
				key={i}
				value={timeSlots[i]}
			>
				{timeSlots[i]}
			</option>
		)
	}

	async function reserveRoom(selectedTime, selectedRoom, inpersonInfo = null) {
		if (reservations.find((res) => res.date.toDateString() == selectedDate.toDateString() && res.room.name === selectedRoom.name)) {
			alert('The room is already reserved by someone else')
			return
		}
		
		const newReservation = {
			user: !inpersonInfo ? currentUser.id : null,
			date: selectedDate.toISOString(),
			time: selectedTime,
			room: selectedRoom.name,
			seats: [],
			resStatus: "Upcoming",
			reason: '',
			isAnonymous: false,
			inpersonInfo: inpersonInfo
		};

		try {
			const response = await fetch('http://localhost:5000/api/reservations', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newReservation)
			})

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message || 'Reservation Failed')
			}

			await fetchReservations();
			alert("Reservation Successful!")
		} catch (err) {
			console.error("Error:", err);
		}
		
		console.log(`
			User has reserved room for
			Date: ${selectedDate.toLocaleDateString()}
			Time: ${selectedTime}
			Room: ${selectedRoom.name}
		`);
	}

	const handleModal = () => {
		if (!reservations.find((res) => 
				res.date.toDateString() === selectedDate.toDateString() && 
				res.room.name === selectedRoom.name)) {
			setOpen(true)
		}
		else {
			alert('The room is already reserved by someone else')
		}
	}

	if (loading || !selectedRoom || rooms.length === 0) return <div>Loading...</div>
	return(
	<div className="w-full min-h-screen flex justify-center items-center">
		<div className="flex flex-col justify-center items-center rounded-2xl gap-3">
			<div className="text-center">
				<div className="google text-5xl font-bold ">
					Request for a room
				</div>
				<div className="google mt-2 text-gray-400">
					Do note that each reservation must be made 14-31 days in advance.<br/>
					All requests are subject for approval.
				</div>
			</div>

			{/* Outer Div that holds DATE ROOM TIMESLOT + REQ btn */}
			<div className="flex flex-col justify-center items-center rounded-2xl gap-8">
					{/* Inner Div that holds DATE ROOM TIMESLOT */}
					<div className="gray-67 justify-center items-center rounded-2xl text-2xl google flex gap-12 w-[800px]">
						
						{/* Inner Div that holds DATE */}
						<div className="gap-2 flex flex-row">
							<div className="text-xl google flex items-center justify-center">
								Date:
							</div>
							<div className="text-xl w-[150px] h-[100px] flex items-center justify-center">
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
								value={selectedRoom.name}
								onChange={(e) => {
									const newRoom = rooms.find(r => r.name === e.target.value);
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
								width: "150px",
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
					
					{/* Reserve btn */}
					<div className="bg-[#145b92] p-3 rounded-xl transition-all hover:scale-110 active:scale-105 active:bg-[#02497F] active:shadow-inner select-none"
						onClick={() => {
							if (currentUser.isAdmin)
								handleModal()
							else
								reserveRoom(selectedTime, selectedRoom)
						}}
					>
						Request Room Reservation
					</div>
					<InpersonModal
						open={open}
						onClose={() => setOpen(false)}
						onConfirm={(info) => reserveRoom(selectedTime, selectedRoom, info)}
					/>
			</div>
		</div>
	</div>

	);
}