import { useState } from "react";
import DatePicker from "react-datepicker";

const days = 14;
const rooms = 10;
const tslots = 7;
const seats = 44;

const reservations = [];

for (let i = 0; i < days; i++) {
	reservations[i] = [];

	for (let j = 0; j < rooms; j++) {
		reservations[i][j] = [];

		for (let k = 0; k < tslots; k++) {
			reservations[i][j][k] = [];

			for (let l = 0; l < seats; l++) {
				reservations[i][j][k][l] = false; // if false seat is gay
			}
		}
	}
}

export function Reservations(){
	// TODO
	// maximum 5 reservations only per room (make an error message) (partial)
	// reserve button will turn it (idk what color) (done)
	// make hard coded data 
	// ensure that an error pops up if you clicked on a booked seat (partial)
	// fix ui, everything must be centered add combobox for rooms (partial)
	// 2d array of seats
	// make sure that going back from profile to idk it doesnt reset the array
	// make sure for each date it has a 2d array of seats so its now [day][room][seat]
	// bawal sundays to book kasi walang pasok
	// dont forget the time ig... [day][room][seat][timeslot]
	// <reservation done>
	const timeSlots = [
		"07:30-09:00", "09:15-10:45", "11:00-12:30", "12:45-14:15", 
		"14:30-16:00", "16:15-17:45", "18:00-19:30",
	];
	const room = ["GK201", "GK202", "GK203", "GK204", "GK205", "GK206", "GK207", "GK208", "GK209", "GK210"]
	const [selectedDate, setSelectedDate] = useState(()=>{
		const today = new Date();
		return today;
	});
	const [timeValue, setTimeValue] = useState(timeSlots[0]);
	const [roomValue, setRoomValue] = useState(room[0])
	const row = document.createElement("tr");
	const DateChange = (date) => {
		setSelectedDate(date)
	};
	
	const mindate = () => new Date();

	const chosenSeatsList = []; //la mesa sa right

	const selectedSeats = []; //stores a number

	const table = document.getElementById("chosenSeatsTable");
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const selected = new Date(selectedDate);
	selected.setHours(0, 0, 0, 0);
	const dayIndex = Math.floor((selected - today) / (1000 * 60 * 60 * 24));

	const roomIndex = room.indexOf(roomValue);
	const timeIndex = timeSlots.indexOf(timeValue);

	function reserveSeat(timeValue, roomValue, selectedSeats){
		console.log(
		`Date: ${selectedDate.toLocaleDateString()},
		Time: ${timeValue},
		Room: ${roomValue}, 
		Seats: ${selectedSeats.join(", ")}`
		);

		selectedSeats.forEach(seatID => {
			reservations[dayIndex][roomIndex][timeIndex][seatID] = true;
		});
	
		refreshSeats(dayIndex, roomIndex, timeIndex);
		
		selectedSeats.splice(0, selectedSeats.length); // clear selected
		chosenSeatsList.splice(0, chosenSeatsList.length);
		if (table) table.innerHTML = "";
	}

	function refreshSeats() {
		const today = new Date();
		today.setHours(0,0,0,0);
		const selected = new Date(selectedDate);
		selected.setHours(0,0,0,0);
		const dayIndex = Math.floor((selected - today) / (1000*60*60*24));
		const roomIndex = room.indexOf(roomValue);
		const timeIndex = timeSlots.indexOf(timeValue);
		const seatStatus = reservations[dayIndex][roomIndex][timeIndex];
		

		for (let seatID = 0; seatID < seatStatus.length; seatID++) {
        const element = document.getElementById(seatID);
        if (!element) continue;

        element.classList.remove("bg-blue-500");

        if (seatStatus[seatID]) element.classList.add("bg-green-500");
        else element.classList.remove("bg-green-500");
    }

    const table = document.getElementById("chosenSeatsTable");
    if (table) table.innerHTML = "";
    selectedSeats.splice(0, selectedSeats.length);
    chosenSeatsList.splice(0, chosenSeatsList.length);
		
	}

	function selectSeat(seatID){
		if(chosenSeatsList.length >= 5){
			alert("You can only reserve up to 5 seats.");
			return;
		}
		const element = document.getElementById(seatID);
		const existingRow = document.getElementById(`seat-row-${seatID}`); //will appear sa chosen seats 
		
		const table = document.getElementById("chosenSeatsTable");
		if (!element.classList.contains("bg-blue-500")){
			element.classList.add("bg-blue-500");
			selectedSeats.push(seatID);

			const row = document.createElement("tr");
			row.className = "border-b border-gray-600";

			row.id = `seat-row-${seatID}`; // unique id for chosen seats

			chosenSeatsList.push({room: "GK201", seat: seatID});

			row.innerHTML = 
				`
					<td class="font-medium google text-center">
						GK201:
					</td>

					<td class="text-center google">
						Seat #${seatID}
					</td>

					<td class="px-2 py-1 text-right google">
						<button class="ml-auto flex items-center gap-2 text-red-400 hover:text-red-600 hover:scale-105 transition-all duration-200">
							Remove
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="20px"
								width="20px"
								viewBox="0 -960 960 960"
								class="flex-shrink-0"
							>
								<path
								d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z"
								fill="currentColor"
								/>
							</svg>
						</button>
					</td>
				`;
			const removeButton = row.querySelector("button");
			removeButton.onclick = () => {
				element.classList.remove("bg-blue-500");
				selectedSeats.splice(selectedSeats.indexOf(seatID), 1);
				row.remove();
			};
			table.appendChild(row);

			for(let i = 0 ; i<selectedSeats.length; i++){
				console.log(selectedSeats[i]);
			}
		}
		else {
			element.classList.remove("bg-blue-500");
			selectedSeats.splice(selectedSeats.indexOf(seatID), 1);
			if(existingRow) existingRow.remove();
		}
	}

	const computerCol = []
	for(let i = 1; i<=5; i++){
		const computerRow = []
		for(let j = 1; j<=9; j++){
			const seatID = 9*(i-1)+j   
			computerRow.push(
				
				<button
					id={seatID} 
					onClick={() => selectSeat(seatID)}
					className={`
						w-16 h-12 hover:bg-gray-600 flex flex-col items-center justify-center my-9 
						${j % 3 === 0 ? "mr-10" : "mr-0"}
						`}>
					<h1 className="m-0 text-xs">{9*(i-1)+j}</h1>
					<img src="./src/resources/computers.png" alt="computer" className="w-50 h-25 object-contain"/>
				</button>

			);
		}
		computerCol.push(
			<div className={`flex justify-center`}>
				{computerRow}
			</div>
		);
	}

	
	const optionRoom = [];
	for (let i = 0; i< room.length; i++){
		optionRoom.push(
			<option
				key={i}
				value={room[i]}
				style={{ backgroundColor: "#e0e0e0", color: "#000" }}
			>
				{room[i]}
			</option>
		);
	}

	const timeSlotOptions = [];
	for (let i = 0; i<timeSlots.length;i++){
		timeSlotOptions.push(
			<option
				key={i}
				value={timeSlots[i]}
				style={{ backgroundColor: "#e0e0e0", color: "#000" }}
			>
				{timeSlots[i]}
			</option>
		)
	}
	
	return(
		<div className="flex flex-row justify-center items-center rounded-2xl gap-7">
			<div className="flex items-center justify-center  flex flex-col">
				<div className="text-4xl google mt-5">
					Reserve a room:
				</div>

				<div className="flex flex-row">
					<div className="text-2xl google flex items-center justify-center">
						Select a date:
					</div>
					<div className="w-[300px] h-[100px] flex items-center justify-center">
						<DatePicker
							className="p-2 border rounded text-center"
							selected={selectedDate}
							onChange={(date) => {
								setSelectedDate(date);
								refreshSeats();
							}}
	
							minDate={mindate()}
							dateFormat="MM/dd/yyyy"
							>
						</DatePicker>
					</div>
				</div>

				<div className="text-2xl google flex items-center justify-center gap-4">
					<label>
						Room:  
						<select
						style={{
							width: "100px",
							height: "40px",
							border: "2px solid #fff",
							borderRadius: "8px",
							padding: "6px 10px",
							fontSize: "16px",
						}}
						value={roomValue}
						onChange={(e) => {
							const newRoom = e.target.value;
							setRoomValue(newRoom);
							const newRoomIndex = room.indexOf(newRoom);
							const newTimeIndex = timeSlots.indexOf(timeValue);
							refreshSeats();
						}}
						>
						<option value="" style={{ backgroundColor: "#e0e0e0", color: "#000" }}>
							Select
						</option>
						{optionRoom}
						</select>
					</label>

					<label>
						Timeslot:  
						<select
						style={{
							width: "140px",
							height: "40px",
							border: "2px solid #fff",
							borderRadius: "8px",
							padding: "6px 10px",
							fontSize: "16px",
						}}
						value={timeValue}
						onChange={(e) => {
							const newTime = e.target.value;
							setTimeValue(newTime);
							const newRoomIndex = room.indexOf(roomValue);
							const newTimeIndex = timeSlots.indexOf(newTime);
							refreshSeats();
						}}
						>
						<option value="" style={{ backgroundColor: "#e0e0e0", color: "#000" }}>
							Select
						</option>
							{timeSlotOptions}
						</select>
					</label>
				</div>

     
				<div className="w-[800px] h-[600px] gray-67 rounded-2xl">
					{computerCol}
				</div>
			</div>
			
			<div className="w-[400px] h-[600px] gray-67 justify-center items-center rounded-2xl">
				<div className="flex justify-center py-3 text-xl font-bold google border-b border-gray-600">
					Chosen Seats:
				</div>

				{/* the list of chosen seats go here*/}
				<div className="[400px] h-[470px] overflow-auto justify-center">
					<table id="chosenSeatsTable" className="w-full text-left border-collapse text-left">
					</table>
				</div>


				<div className="p-4 border-t border-gray-600">
					<button 
						className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700"
						onClick={()=> reserveSeat(timeValue, roomValue, selectedSeats)}
						>
						Reserve
					</button>
				</div>
			</div>
		</div>
	);
}