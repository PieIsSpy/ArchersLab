import { useState, useEffect} from "react";
import { Link } from "react-router-dom";

import { Modal, InpersonModal } from "../components/Modals";
import { Button, CancelButton, DarkDatePicker, Picker } from "../components/Input";

import { useContext } from "react";
import { UserContext } from "../context/UserContext";

import { fetchRooms } from "../services/roomServices";
import { fetchReservations } from "../services/reservationServices";

const layout1 = [
	[1,1,1,0,1,1,1,0,1,1,1],
	[0,0,0,0,0,0,0,0,0,0,0],
	[1,1,1,0,1,1,1,0,1,1,1],
	[0,0,0,0,0,0,0,0,0,0,0],
	[1,1,1,0,1,1,1,0,1,1,1],
	[0,0,0,0,0,0,0,0,0,0,0],
	[1,1,1,0,1,1,1,0,1,1,1],
	[0,0,0,0,0,0,0,0,0,0,0],
	[1,1,1,0,1,1,1,0,1,1,1]
];

const layout2 = [
	[1,1,1,0,0,1,1,1],
	[0,0,0,0,0,0,0,0],
	[1,1,1,0,0,1,1,1],
	[0,0,0,0,0,0,0,0],
	[1,1,1,0,0,1,1,1],
	[0,0,0,0,0,0,0,0],
	[1,1,1,0,0,1,1,1],
	[0,0,0,0,0,0,0,0],
	[1,1,1,0,0,1,1,1]
];

const layout3 = [
	[2,2,2,0,2,2,2],
	[1,1,1,0,1,1,1],
	[0,0,0,0,0,0,0],
	[2,2,2,0,2,2,2],
	[1,1,1,0,1,1,1]
];

const layout4 = [
	[0,1,1,0,1,1,0],
	[0,1,1,0,1,1,0],
	[0,1,1,0,1,1,0],
	[0,1,1,0,1,1,0],
	[0,1,1,0,1,1,0],
]

const layout5 = [
	[1,1,1,1,0,1,1,1,1],
			[0],
	[1,1,1,1,0,1,1,1,1],
			[0],
	[1,1,1,1,0,1,1,1,1],
			[0],
	[1,1,1,1,0,1,1,1,1],
			[0],
	[1,1,1,1,0,1,1,1,1],
]

const timeSlots = [
	"07:30-09:00", "09:15-10:45", "11:00-12:30", "12:45-14:15", 
	"14:30-16:00", "16:15-17:45", "18:00-19:30",
];

export function ReserveSeat()
{
	// context
	const { currentUser } = useContext(UserContext);

	// UI state
	const [loading, setLoading] = useState(true);
	const [open, setOpen] = useState(false);
	const [showBookedModal, setShowBookedModal] = useState(false);
	const [modalChildren, setModalChildren] = useState();

	// data
	const [rooms, setRooms] = useState([]);
	const [reservations, setReservations] = useState([]);

	// helper
	function basedate(d = new Date()) {
		const date = new Date(d);
		date.setHours(8, 0, 0, 0);
		return date;
	}

	// date selection
	const [selectedDate, setSelectedDate] = useState(basedate(new Date));

	// date limits
	const today = basedate();
	const minDate = today;

	const maxDate = new Date(today);
	maxDate.setDate(maxDate.getDate() + 10);

	// selection
	const [selectedTime, setSelectedTime] = useState("07:30-09:00");
	const [selectedRoom, setSelectedRoom] = useState(null); // set after rooms load
	const [selectedSeats, setSelectedSeats] = useState([]);

	// computed / dependent state
	const [takenSeats, setTakenSeats] = useState([]);
	const [timeSlotOptions, setTimeSlotOptions] = useState([]);
	
	const getReservationDetails = (seatID) => {
		const selectedDateStr = selectedDate.toDateString();
		const res = reservations.find(r => {
				const resDate = new Date(r.date).toDateString();
				return (
					resDate === selectedDateStr &&
					r.room._id === selectedRoom._id &&
					r.time === selectedTime &&
					r.seats.includes(seatID)
				)
			}
		);

		if (!res) return {name: "Unknown User", isRegistered: false};

		if (res.isAnonymous) return {name: "Anonymous", isRegistered: false};
		if (res.user) return {name: res.user.name, id: res.user._id, isRegistered: true}
		if (res.inpersonInfo) return {name: res.inpersonInfo.name, isRegistered: false}

		return {name: "Unknown User", isRegistered: false};
	};
	
	const handleBookedSeatClick = async (seatID) => {
		const info = getReservationDetails(seatID);
		setModalChildren(
			<>
				<p>Seat is already booked by:</p>
				<h1 className="mt-10 text-3xl font-bold google">{info.name}</h1>
				{info.isRegistered ? (
					<Link 
					to={`/Profile/${info?.id}`} 
					className="text-gray-500 mb-10 hover:text-blue-600 transition-colors block"
					>
					View Profile
					</Link>
				):<div className="mb-10"></div>}
			</>
		);
		setShowBookedModal(true);
	};

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

	useEffect(() => {
		var tempTimeSlots = [...timeSlots]

		// if (selectedRoom) 
			// console.log(selectedRoom._id)
		
		// console.log(selectedRoom)
		reservations.forEach(res => {
			const resDate = new Date(res.date);
			console.log(res.resStatus)
			console.log(res)
			if (selectedRoom)
				if (resDate.toDateString() === selectedDate.toDateString() && // Same day
					res.room._id === selectedRoom._id && // Same room
					res.seats.length === 0 &&
					res.resStatus != "Cancelled") // No seats (Full room reservation)
					{
						tempTimeSlots.splice(tempTimeSlots.indexOf(res.time),1);
					}
		});

		setTimeSlotOptions(
			tempTimeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)
		);

    	setSelectedTime(tempTimeSlots[0] || null);

	}, [selectedDate, selectedRoom, reservations])
	
	useEffect(() => {
		if (!selectedRoom) {
			setTakenSeats([]);
			setSelectedSeats([]);
			return;
		}

		const takenSlots = reservations.filter(res => {
			return new Date(res.date).toDateString() === selectedDate.toDateString() &&
				res.room._id === selectedRoom._id &&
				res.time === selectedTime &&
				res.resStatus != "Cancelled"
		})

		setTakenSeats(takenSlots);
		setSelectedSeats([]);
	}, [selectedDate, selectedRoom, selectedTime, reservations]);
	
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

	const deploySeats = (layoutArr) => {
		const rows = [];
		let seatidx = 1;
		let hasReversed = layoutArr.some(row => row.includes(2));
		for (let i = 0; i < layoutArr.length; i++) {
			const cols = [];
			for (let j = 0; j < layoutArr[i].length; j++) {
				if (layoutArr[i][j] !== 0) {
					const seatID = seatidx;
					const isTaken = takenSeats.some(res => res.seats.includes(seatID));
					const isSelected = selectedSeats.includes(seatID);
					const isFlipped = layoutArr[i][j] === 2;

					const renderLabelTop = !hasReversed || isFlipped;
					const renderLabelBottom = hasReversed && !isFlipped;

					const imgSrc = isFlipped
						? "./src/resources/computer_flipped.png"
						: "./src/resources/computer.png";

					cols.push(
						<div className="flex flex-col items-center">
							{renderLabelTop && (
								<h1 className="m-0 text-xs">{seatID}</h1>
							)}

							<button
								id={seatID}
								onClick={() => {
									if (isTaken) 
										handleBookedSeatClick(seatID) 
									else 
										toggleSeatSelection(seatID)
								}}
								className={`w-16 h-16 flex items-center justify-center
									${isTaken ? "booked" : "hover:bg-gray-500"}
									${isSelected ? "blue" : ""}`}
							>
								<img
									src={imgSrc}
									alt="computer"
									className="w-16 h-16 object-contain"
								/>
							</button>

							{renderLabelBottom && (<h1 className="m-0 text-xs">{seatID}</h1>)}
						</div>
					);
					seatidx++;
				} else {
					cols.push(
						<div className="w-16 h-10 flex items-center justify-center">
							<img
								src="./src/resources/emptyspace.png"
								alt="empty"
								className="w-16 h-10 object-contain"
							/>
						</div>
					);
				}
			}
			rows.push(
				<div className={`flex justify-center`}>
					{cols}
				</div>
			)
		}
		return <div className={`flex-row`}>{rows}</div>;
	}

	const renderSeats = () => {
		switch (selectedRoom.layout) {
			case 1:
				return deploySeats(layout1);
			case 2:
				return deploySeats(layout2);
			case 3:
				return deploySeats(layout3);
			case 4:
				return deploySeats(layout4);
			case 5:
				return deploySeats(layout5);
		}
	}

	async function reserveSeat(selectedTime, selectedRoom, selectedSeats, inpersonInfo = null) {
		if (!selectedSeats.length) return;

		const newReservation = {
			user: !inpersonInfo ? currentUser._id : null,
			date: selectedDate.toISOString(),
			time: selectedTime,
			room: selectedRoom._id,
			seats: selectedSeats,
			resStatus: "Upcoming",
			reason: '',
			isAnonymous: document.getElementById("anonymous-checkbox").checked,
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

			const reservationData = await fetchReservations();
			setReservations(reservationData)
			setSelectedSeats([])
			alert("Reservation Successful!")
		} catch (err) {
			console.error("Error:", err);
		}

		const seatList = selectedSeats.join(", ");
		console.log(`
			User ${currentUser._id} has reserved Seats for
			Date: ${selectedDate.toLocaleDateString()}
			Time: ${selectedTime}
			Room: ${selectedRoom._id}
			Seats: ${seatList}
		`);
	}

	function toggleSeatSelection(seatID) {
		if (selectedSeats.includes(seatID)) {
			setSelectedSeats(prev => prev.filter(id => id !== seatID));
			return;
		}

		if (selectedSeats.length >= 5) {
			alert(`You can only reserve 5 seats per timeslot/room!`)
			return;
		}

		setSelectedSeats(prev =>
			[...prev, seatID].sort((a, b) => a - b)
		);
	}
	
	if (loading || !selectedRoom) return <div className="mx-auto">Loading...</div>
	return(
		<div className="mx-auto">
			<div className="grid gap-4 w-3/4 grid-rows-[auto_1fr]">
				<div className="text-5xl google font-bold">
					Reserve a seat	
				</div>
				<div className="gray-67 justify-center items-center rounded-2xl text-2xl google flex gap-20 p-5">
					<DarkDatePicker
						selected={selectedDate}
						onChange={(date) => setSelectedDate(date)}
						minDate={minDate}
						maxDate={maxDate}
					/>

					<Picker 
						label="Room:"
						value={selectedRoom.name}
						onChange={(e) => {
								const newRoom = rooms.find(r => r._id === e.target.value);
								setSelectedRoom(newRoom);
								setSelectedSeats([])
						}}
						children={optionRoom}
					/>
					
					<Picker 
						label="Timeslot:"
						value={selectedTime}
						onChange={(e) => {
								const newTime = e.target.value;
								setSelectedTime(e.target.value);
								const newRoomIndex = rooms.indexOf(selectedRoom);
								const newTimeIndex = timeSlots.indexOf(newTime);
						}}
						children={timeSlotOptions}
					/>
					
					<label className="text-xl gap-3 flex flex-row justify-center items-center">
						<div>
							Anonymous?{" "}
						</div>
						<input 
							type="checkbox" 
							id="anonymous-checkbox" 
							class="appearance-none w-5 h-5 border-2 border-gray-400 rounded checked:bg-gray-500 checked:border-gray-500" 
						/>					
					</label>
				</div>
				
				<div className="grid grid-cols-[auto_1fr] justify-center items-stretch rounded-2xl gap-4">
					<div className="gray-67 w-200 h-160 rounded-2xl flex justify-center items-center p-8">
						{renderSeats()}
					</div>

					<div className="flex flex-col justify-center gray-67 rounded-2xl p-3">
						<div className="flex justify-center w-full text-xl font-bold google border-b-2 pb-3 border-gray-600">
							Chosen Seats
						</div>

						<div className="overflow-auto flex-1">
							<table className="w-full mx-auto">
								<tbody>
								{selectedSeats.map(seatID => (
									<tr key={seatID} className="border-b-2 border-gray-600">
									<td className="text-left google">Seat #{seatID}</td>
									<td className="w-1/3 py-1 google">
									<CancelButton 
										onClick={() => toggleSeatSelection(seatID)}									
									/>
									</td>
									</tr>
								))}
								</tbody>
							</table>
						</div>
						<Button 
							label="Reserve"
							onClick={()=> {
								if (!selectedSeats.length)
									alert(`Please select a seat!`)
								// ADMIN SWITCH, enable modal
								else if (currentUser.isAdmin) 
									setOpen(true)
								else
									reserveSeat(selectedTime, selectedRoom, selectedSeats)
							}}
						/>
					</div>
				</div>
			<InpersonModal
				open={open}
				onClose={() => setOpen(false)}
				onConfirm={(info) => reserveSeat(selectedTime, selectedRoom, selectedSeats, info)}
			/>
			<Modal
				open={showBookedModal}
				onClose={() => setShowBookedModal(false)}
			 	children={modalChildren} 
			/>
			</div>
		</div>
	);
}