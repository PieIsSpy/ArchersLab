import { useState, useEffect} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../dark-datepicker.css";
import { Room } from "../models/Room";
import { userJSON_to_Object } from "../models/User";
import { Reservation } from "../models/Reservation";

export function Reservations(){
	/* TODO:
	- maximum 5 reservations only per room (make an error message) (partial)
	- reserve button will turn it (idk what color) (done)
	- make hard coded data 
	- ensure that an error pops up if you clicked on a booked seat (partial)
	- fix ui, everything must be centered add combobox for rooms (partial)
	- 2d array of seats
	- make sure that going back from profile to idk it doesnt reset the array
	- make sure for each date it has a 2d array of seats so its now [day][room][seat]
	- bawal sundays to book kasi walang pasok
	*/ 

	// Initialize options for select menu later
	const timeSlots = [
		"07:30-09:00", "09:15-10:45", "11:00-12:30", "12:45-14:15", 
		"14:30-16:00", "16:15-17:45", "18:00-19:30",
	];

	// Set states for React
	const [selectedDate, setSelectedDate] = useState(()=>{
		const today = new Date();
		return today;
	});
	const [timeValue, setTimeValue] = useState(timeSlots[0]);
	const [selectedSeats, setSelectedSeats] = useState([]);
	const [bookedSeats, setBookedSeats] = useState([]);

	const [rooms, setRooms] = useState([]);
	const [roomValue, setRoomValue] = useState(null);
	const [reservations, setReservations] = useState([])
	const [loading, setLoading] = useState(true);

	const DateChange = (date) => {
		setSelectedDate(date)
	};

	useEffect(() => {
		const roomsUrl = 'http://localhost:5000/api/rooms'
		const reservationsUrl = 'http://localhost:5000/api/reservations'
		const fetchRooms = async () => {
			try {
				// fetch rooms
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
					setRoomValue(roomInstances[0]);
				}

				const reservationInstances = reservationsData.map(res => {
					return new Reservation(
						userJSON_to_Object(res.user),
						new Date(res.date),
						res.time,
						roomInstances.find(r => r.id === (res.room._id)),
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

		fetchRooms();
	}, []);

	useEffect(() => {
		displayState();
		renderSeats();
		setSelectedSeats([]);
	}, [selectedDate, roomValue, timeValue]);

	const today = new Date();
	const selected = new Date(selectedDate);

	today.setHours(0, 0, 0, 0);
	selected.setHours(0, 0, 0, 0);

	// Set minimum and maximum date (earliest and latest)
	const minDate = () => new Date();
	const maxdate = () => {
		return today.setDate(today.getDate() + 13);
	}

	const handleRoomChange = (e) => {
		const newRoom = rooms.find(r => r.name === e.target.value);
		setRoomValue(newRoom);
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
		switch (roomValue.layoutID) {
			case 1:
				return deploySeats(layout1);
			case 2:
				return deploySeats(layout2);
			case 3:
				return deploySeats(layout3);
		}
	}

	function reserveSeat(timeValue, roomValue, selectedSeats) {
		if (!selectedSeats.length) return;

		setBookedSeats(prev => [...prev, ...selectedSeats]);

		const seatStatus = reservations[dayIndex][roomIndex][timeIndex];
		selectedSeats.forEach(id => seatStatus[id] = true);

		setSelectedSeats([]);

		const seatList = selectedSeats.join(", ");
		console.log(`
			User has reserved Seats for
			Date: ${selectedDate.toLocaleDateString()}
			Time: ${timeValue}
			Room: ${roomValue.name}
			Seats: ${seatList}
		`);

		document.getElementById("chosenSeatsTable").innerHTML = "";
	}

	function toggleSeatSelection(seatID) {
		if (selectedSeats.includes(seatID)) {
			setSelectedSeats(prev => prev.filter(id => id !== seatID));
			return;
		}

		if (selectedSeats.length + bookedSeats.length >= 5) {
			alert("You can only reserve up to 5 seats.");
			return;
		}

		setSelectedSeats(prev => [...prev, seatID]);
	}

	function displayState(){

		let seatMatrixConsole = "";
		const reservedSeatList = reservations[dayIndex][roomIndex][timeIndex]
		for(let i = 0; i<5; i++){
			for(let j = 0; j<9; j++){
				if(reservedSeatList[9*(i)+ j] === false){
					seatMatrixConsole += " - ";
				}
				else{
					seatMatrixConsole += " X ";
				}
				
			}
			seatMatrixConsole += "\n";

		}
		console.log(
			`currently looking at:
			Date: ${selectedDate.toLocaleDateString()}
			Time: ${timeValue},
			Room: ${roomValue.name}, 

			Reserved seats: \n${seatMatrixConsole}
			`
		);
	}
	
	if (loading || !roomValue) return <div>Loading...</div>
	return(
		<div className="flex flex-col justify-center items-center rounded-2xl mt-10 gap-3">
			<div className="text-5xl google font-bold mr-220">
				Reserve a seat		
			</div>
			<div className="flex flex-row gap-4">
				<div className="flex flex-row justify-center items-center rounded-2xl">
					<div className="flex items-center justify-center flex-col gap-4">
						<div className="gray-67 justify-center items-center rounded-2xl text-2xl google flex items-center justify-center gap-8 w-[800px]">
							<div className="gap-2 flex flex-row justify-center items-center">
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
										minDate={minDate()}
										maxDate={maxdate()}
										dateFormat="MM/dd/yyyy"
									/>
								</div>
							</div>

							<label className="text-xl gap-3 flex flex-row justify-center items-center">
								<div>
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
								value={roomValue.name}
								onChange={handleRoomChange}
								>
								{optionRoom}
								</select>
							</label>

							<label className="text-xl gap-3 flex flex-row justify-center items-center">
								<div>
									Timeslot:  
								</div>
								<select
								className = "text-xl gray-89"
								style={{
									width: "155px",
									height: "50px",
									borderRadius: "8px",
									padding: "6px 10px",
								}}
								value={timeValue}
								onChange={(e) => {
									
									const newTime = e.target.value;
									setTimeValue(e.target.value);
									const newRoomIndex = room.indexOf(roomValue);
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
								{roomValue.name}
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
								{selectedDate.toLocaleDateString()}
							</div>
						</span>
					</div>
					
					<div className="[400px] h-[500px] overflow-auto justify-center">
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
							onClick={()=> reserveSeat(timeValue, roomValue, selectedSeats)}
							>
							Reserve
						</button>
					</div>
				</div>
			</div>

		</div>
	);
}