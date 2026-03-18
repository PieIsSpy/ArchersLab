import { useState, useEffect} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../dark-datepicker.css";
import { Room } from "../models/Room";
import { InpersonModal } from "../components/Modals";
import { userJSON_to_Object, currentUser } from "../models/User";
import { Reservation } from "../models/Reservation";

export function ReserveSeat(){
	const [open, setOpen] = useState(false);
	const [rooms, setRooms] = useState([]);

	const [selectedDate, setSelectedDate] = useState(new Date());
	const [selectedTime, setSelectedTime] = useState("07:30-09:00");
	const [selectedRoom, setSelectedRoom] = useState(rooms[0]);
	const [selectedSeats, setSelectedSeats] = useState([]);
	
	const [reservations, setReservations] = useState([])
	const [bookedSeats, setBookedSeats] = useState([]);

	const [loading, setLoading] = useState(true);

	const timeSlots = [
		"07:30-09:00", "09:15-10:45", "11:00-12:30", "12:45-14:15", 
		"14:30-16:00", "16:15-17:45", "18:00-19:30",
	];

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
					res.isAnnonymous,
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
	}, []);
	
	const timeIndex = timeSlots.indexOf(selectedTime);

	useEffect(() => {
		if (!selectedRoom) {
			setBookedSeats([]);
			return;
		}

		const takenSlots = reservations.filter(res => {
			const isSameDate = res.date.toDateString() === selectedDate.toDateString();
			const isSameRoom = res.room.name === selectedRoom.name;
			const isSameTime = res.time === selectedTime;

			return isSameDate && isSameRoom && isSameTime;
		}).flatMap(res => res.seats);

		setBookedSeats(takenSlots);
		setSelectedSeats([]);
	}, [selectedDate, selectedRoom, selectedTime, reservations]);

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const selected = new Date(selectedDate);
	selected.setHours(0, 0, 0, 0);

	// Set minimum and maximum date (earliest and latest)
	const minDate = new Date();
	const maxDate = new Date();
	maxDate.setDate(today.getDate() + 13);

	const handleDateChange = (newDate) => {
		setSelectedDate(newDate)
	};

	const handleRoomChange = (e) => {
		const newRoom = rooms.find(r => r.name === e.target.value);
		setSelectedRoom(newRoom);
		setSelectedSeats([])
	}
	
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
		[0,0,0,0,0,0,0],
		[2,2,2,0,2,2,2],
		[1,1,1,0,1,1,1],
		[0,0,0,0,0,0,0],
		[2,2,2,0,2,2,2],
		[1,1,1,0,1,1,1]
	];

	const deploySeats = (layoutArr) => {
		const rows = [];
		let seatidx = 1;
		let hasReversed = layoutArr.some(row => row.includes(2));
		for (let i = 0; i < layoutArr.length; i++) {
			const cols = [];
			for (let j = 0; j < layoutArr[i].length; j++) {
				if(layoutArr[i][j] != 0){
					const seatID = seatidx;
					const isBooked = bookedSeats.includes(seatID);
					const isSelected = selectedSeats.includes(seatID);
					if(layoutArr[i][j] === 1)
					{
						cols.push(
							<div className="flex flex-col items-center">
								{!hasReversed ? (
									<h1 className="m-0 text-xs">{seatID}</h1>
								) : null}
								<button
									id={seatID}
									onClick={() => isBooked ? null : toggleSeatSelection(seatID)}
									className={`
										w-16 h-16 flex flex-col items-center justify-center 
										${isBooked ? "booked cursor-not-allowed" : "hover:bg-gray-500"}
										${isSelected ? "blue" : ""}
									`}
								>
									<img
										src="./src/resources/computer.png"
										alt="computer"
										className="w-16 h-16 object-contain"
									/>
								</button>
								{hasReversed ? (
									<h1 className="m-0 text-xs">{seatID}</h1>
								) : null}
							</div>
						);
					}
					if(layoutArr[i][j] === 2)
					{
						cols.push(
							<div className="flex flex-col items-center">
								
								<h1 className="m-0 text-xs">{seatID}</h1>
								<button
									id={seatID}
									onClick={() => isBooked ? null : toggleSeatSelection(seatID)}
									className={`
										w-16 h-16 flex flex-col items-center justify-center 
										${isBooked ? "booked cursor-not-allowed" : "hover:bg-gray-500"}
										${isSelected ? "blue" : ""}
									`}
								>
									<img
										src="./src/resources/computer_flipped.png"
										alt="computer"
										className="w-16 h-16 object-contain"
									/>
								</button>
							</div>
						);
					}
					seatidx++;
				}
				else
				{
					cols.push(
						<button
						className="w-16 h-1 flex items-center justify-center my-5"
						>
						<img
							src="./src/resources/emptyspace.png"
							alt="empty"
							className="w-50 h-25 object-contain"
						/>
						</button>
					)
					
				}
			}
			rows.push(
				<div className={`flex justify-center`}>
					{cols}
				</div>
			)
		}
		return rows;
	}

	const renderSeats = () => {
		switch (selectedRoom.layoutID) {
			case 1:
				return deploySeats(layout1);
			case 2:
				return deploySeats(layout2);
			case 3:
				return deploySeats(layout3);
		}
	}

	async function reserveSeat(selectedTime, selectedRoom, selectedSeats, inpersonInfo = null) {
		if (!selectedSeats.length) return;

		const newReservation = {
			user: !inpersonInfo ? currentUser.id : null,
			date: selectedDate.toISOString(),
			time: selectedTime,
			room: selectedRoom.name,
			seats: selectedSeats,
			resStatus: "Upcoming",
			reason: '',
			isAnnonymous: false,
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
			setSelectedSeats([])
			alert("Reservation Successful!")
		} catch (err) {
			console.error("Error:", err);
		}

		const seatList = selectedSeats.join(", ");
		console.log(`
			User has reserved Seats for
			Date: ${selectedDate.toLocaleDateString()}
			Time: ${selectedTime}
			Room: ${selectedRoom.name}
			Seats: ${seatList}
		`);
	}

	function toggleSeatSelection(seatID) {
		if (selectedSeats.includes(seatID)) {
			setSelectedSeats(prev => prev.filter(id => id !== seatID));
			return;
		}

		if (selectedSeats.length >= 5) {
			alert("You can only reserve up to 5 seats.");
			return;
		}

		setSelectedSeats(prev => [...prev, seatID]);
	}
	
	if (loading || !selectedRoom) return <div>Loading...</div>
	return(
		<div className="flex flex-col justify-center items-center rounded-2xl mt-10 gap-3">
			<div className="text-5xl google font-bold mr-220">
				Reserve a seat		
			</div>
			<div className="flex flex-row gap-4">
				<div className="flex flex-row justify-center items-center rounded-2xl">
					<div className="flex items-center justify-center flex-col gap-4">
						<div className="gray-67 justify-center items-center rounded-2xl text-2xl google flex gap-8 w-[800px]">
							<div className="gap-2 flex flex-row justify-center items-center">
								<div className="text-xl google flex items-center justify-center">Date:</div>
								<div className="text-xl w-[150px] h-[100px] flex items-center justify-center">
									<DatePicker
										className="gray-89 text-xl w-full p-3 rounded-lg text-center
										focus:outline-none focus:ring-2 focus:ring-[#145b92]
										focus:border-[#145b92] selection:bg-blue-300 selection:text-black"
										selected={selectedDate}
										onChange={handleDateChange}
										minDate={minDate}
										maxDate={maxDate}
										dateFormat="MM/dd/yyyy"
									/>
								</div>
							</div>

							<label className="text-xl gap-3 flex flex-row justify-center items-center">
								<div>Room:</div>
								
								<select
									className = "text-xl gray-89 text-center"
									style={{
										width: "120px",
										height: "50px",
										borderRadius: "8px",
										padding: "6px 10px",
									}}
									value={selectedRoom.name}
									onChange={handleRoomChange}
									>
									{optionRoom}
								</select>
							</label>

							<label className="text-xl gap-3 flex flex-row justify-center items-center">
								<div>Timeslot:</div>
								<select
									className = "text-xl gray-89"
									style={{
										width: "155px",
										height: "50px",
										borderRadius: "8px",
										padding: "6px 10px",
									}}
									value={selectedTime}
									onChange={(e) => {
										const newTime = e.target.value;
										setSelectedTime(e.target.value);
										const newRoomIndex = room.indexOf(selectedRoom);
										const newTimeIndex = timeSlots.indexOf(newTime);
									}}
									>
									{timeSlotOptions}
								</select>
							</label>
						</div>

			
						<div className="min-w-[800px] min-h-[665px] w-fit h-fit p-8 gray-67 rounded-2xl">
							{renderSeats()}
						</div>
					</div>
				</div>

				<div className="w-[400px] h-[780px] gray-67 justify-center items-center rounded-2xl">
					<div className="flex justify-center py-3 text-xl font-bold google border-b-2 border-gray-600 mx-auto w-90">
						Chosen Seats
					</div>

					<div className="flex justify-center items-center py-3 text-xl font-bold google border-b-2 border-gray-600 gap-4  mx-auto w-90">
						<span>
							Room<br></br>
							<div className="font-normal">
								{selectedRoom.name}
							</div>
						</span>

						<div className="h-12 w-px bg-gray-600"></div>
						
						<span>
							Timeslot<br></br>
							<div className="font-normal w-30">
								{timeSlots[timeIndex]}
							</div>
						</span>

						<div className="h-12 w-px bg-gray-600"></div>

						<span>
							Date<br></br>
							<div className="font-normal w-24">
								{/* {selectedDate.toLocaleDateString()} */}
							</div>
						</span>
					</div>
					
					<div className="[400px] h-[560px] overflow-auto justify-center">
						<table className="w-[90%] mx-auto">
							<tbody>
							{selectedSeats.map(seatID => (
								<tr key={seatID} className="border-b-2 border-gray-600">
								<td className="text-left google m-10">Seat #{seatID}</td>
								<td className="w-1/3 py-1 google">
									<button
									className="ml-auto flex items-center gap-2 text-red-400 hover:text-red-600 hover:scale-105 transition-all duration-200"
									onClick={() => toggleSeatSelection(seatID)}
									>
									Remove
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
							))}
							</tbody>
						</table>
					</div>


					<div className="flex justify-center items-center py-3 text-xl font-bold google border-t-2 border-gray-600 gap-4  mx-auto w-90">
						<button 
							className="w-full font-bold
							bg-[#145b92] p-3 rounded-xl transition-all hover:scale-102 active:scale-100 active:bg-[#02497F] active:shadow-inner select-none"
							onClick={()=> {
								if (!selectedSeats.length)
									alert("Please select at least one seat to reserve.")
								else if (currentUser.isAdmin)
									setOpen(true)
								else
									reserveSeat(selectedTime, selectedRoom, selectedSeats)
							}}
							>
							Reserve
						</button>
					</div>
				</div>
			</div>
			<InpersonModal
				open={open}
				onClose={() => setOpen(false)}
				onConfirm={(info) => reserveSeat(selectedTime, selectedRoom, selectedSeats, info)}
			/>
		</div>
	);
}