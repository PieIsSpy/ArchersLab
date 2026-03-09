import { useState, useEffect} from "react";
import DatePicker from "react-datepicker";
import { NavLink } from "react-router-dom";

const days = 14; // you can only book 14 days after
const rooms = 10;
const tslots = 7;
const seats = 45;

const reservations = [];

for (let i = 0; i < days; i++) {
	reservations[i] = [];

	for (let j = 0; j < rooms; j++) {
		reservations[i][j] = [];

		for (let k = 0; k < tslots; k++) {
			reservations[i][j][k] = [];

			for (let l = 0; l < seats; l++) {
				reservations[i][j][k][l] = false; // if false seat is gray
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

	useEffect(() => {
		refreshSeats();
		displayState();
	}, [selectedDate, roomValue, timeValue]);
	
	const mindate = () => new Date();
	

	const chosenSeatsList = []; //la mesa sa right

	const selectedSeats = []; //stores a number

	const table = document.getElementById("chosenSeatsTable");
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const selected = new Date(selectedDate);
	selected.setHours(0, 0, 0, 0);
	const dayIndex = Math.floor((selected - today) / (1000 * 60 * 60 * 24)); //subtracts current - reservation date

	const roomIndex = room.indexOf(roomValue);
	const timeIndex = timeSlots.indexOf(timeValue);

	const maxdate = () => {
		return today.setDate(today.getDate() + 13);
	}

	function reserveSeat(timeValue, roomValue, selectedSeats){
		selectedSeats.forEach(seatID => {
			reservations[dayIndex][roomIndex][timeIndex][seatID-1] = true;
		});

		const seatList = selectedSeats.join(", ");
		console.log(
			`
			User have reserved Seat for\n
			Date: ${selectedDate.toLocaleDateString()}
			Time: ${timeValue},
			Room: ${roomValue}, 
			Seat: ${seatList},
			`
		);
	
		refreshSeats(dayIndex, roomIndex, timeIndex);

		selectedSeats.splice(0, selectedSeats.length);
		if (table) table.innerHTML = "";
		
	}

	function refreshSeats() {
		const seatStatus = reservations[dayIndex][roomIndex][timeIndex];
	

		for (let seatID = 1; seatID <= seatStatus.length; seatID++) {
        const element = document.getElementById(seatID);
        if (!element) continue;

        element.classList.remove("blue");

        if (seatStatus[seatID-1]) element.classList.add("gray-booked");
        else element.classList.remove("gray-booked");
    }

    const table = document.getElementById("chosenSeatsTable");
    if (table) table.innerHTML = "";
    selectedSeats.splice(0, selectedSeats.length);
    chosenSeatsList.splice(0, chosenSeatsList.length);

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
			Room: ${roomValue}, 

			Reserved seats: \n${seatMatrixConsole}
			`
		);
	}
	

	function selectSeat(seatID){
		const element = document.getElementById(seatID);
		const existingRow = document.getElementById(`seat-row-${seatID}`); //will appear sa chosen seats 
		
		const table = document.getElementById("chosenSeatsTable");
		if (!element.classList.contains("blue")){
			if(selectedSeats.length >= 5){
				alert("You can only reserve up to 5 seats.");
				return;
			}
			element.classList.add("blue");
			selectedSeats.push(seatID);

			const row = document.createElement("tr");
			row.className = "border-b border-gray-600";

			row.id = `seat-row-${seatID}`;

			row.innerHTML = 
				`
					<td class="text-left google m-10">
						Seat #${seatID}
					</td>

					<td class="w-1/3  py-1 google">
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
				element.classList.remove("blue");
				selectedSeats.splice(selectedSeats.indexOf(seatID), 1);
				row.remove();
			};
			table.appendChild(row);
		}
		else {
			element.classList.remove("blue");
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
						w-16 h-12 hover:bg-gray-500 flex flex-col items-center justify-center my-9 
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
		<div className="flex flex-col justify-center items-center rounded-2xl gap-8">
			<div className="text-4xl google mt-5">
				Reserve a room: 					
			</div>
			<div className="flex flex-row gap-8">
				<div className="flex flex-row justify-center items-center rounded-2xl gap-8">
					<div className="flex items-center justify-center  flex flex-col gap-4">
						<div className="gray-67 justify-center items-center rounded-2xl text-2xl google flex items-center justify-center gap-8 px-4">
							<div className="gap-2 flex flex-row justify-center items-center">
								<div className="text-2xl google flex items-center justify-center">
									Date:
								</div>
								<div className="w-[150px] h-[100px] flex items-center justify-center">
									<DatePicker
										className="gray-89 text-white w-full p-2 rounded-xl text-center"
										selected={selectedDate}
										onChange={(date) => {
											setSelectedDate(date);
										}}
										
										minDate={mindate()}
										maxDate={maxdate()}
										dateFormat="MM/dd/yyyy"
										>
									</DatePicker>
								</div>
							</div>

							<label className="gap-3 flex flex-row justify-center items-center">
								<div>
									Room:  
								</div>
								
								<select
								className = "gray-89 text-white"
								style={{
									width: "120px",
									height: "50px",
									borderRadius: "8px",
									padding: "6px 10px",
									fontSize: "22px",
								}}
								value={roomValue}
								onChange={(e) => {
									
									const newRoom = e.target.value;
									setRoomValue(newRoom);
									const newRoomIndex = room.indexOf(newRoom);
									const newTimeIndex = timeSlots.indexOf(timeValue);
								}}
								>
								{optionRoom}
								</select>
							</label>

							<label className="gap-3 flex flex-row justify-center items-center">
								<div>
									Timeslot:  
								</div>
								<select
								className = "gray-89 text-white"
								style={{
									width: "180px",
									height: "50px",
									borderRadius: "8px",
									padding: "6px 10px",
									fontSize: "22px",
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

			
						<div className="w-[800px] h-[600px] gray-67 rounded-2xl">
							{computerCol}
						</div>
					</div>
				</div>

				<div className="w-[400px] h-[715px] gray-67 justify-center items-center rounded-2xl">
					<div className="flex justify-center py-3 text-xl font-bold google border-b-2 border-gray-600 mx-auto w-90">
						Chosen Seats
					</div>

					<div className="flex justify-center items-center py-3 text-xl font-bold google border-b border-gray-600 gap-4  mx-auto w-90">
						<span>
							Room<br></br>
							<div className="font-normal">
								{roomValue}
							</div>
						</span>

						<div className="h-12 w-px bg-gray-500"></div>
						
						<span>
							Timeslot<br></br>
							<div className="font-normal">
								{timeSlots[timeIndex]}
							</div>
						</span>

						<div className="h-12 w-px bg-gray-500"></div>

						<span>
							Date<br></br>
							<div className="font-normal">
								{selectedDate.toLocaleDateString()}
							</div>
						</span>
					</div>
					
					{/* the list of chosen seats go here*/}
					<div className="[400px] h-[500px] overflow-auto justify-center">
						<table id="chosenSeatsTable" className=" w-[90%] mx-auto">
						</table>
					</div>


					<div className="flex justify-center items-center py-3 text-xl font-bold google border-t border-gray-600 gap-4  mx-auto w-90">
						<button 
							className="w-full py-3 rounded-xl blue text-white font-bold hover:scale-105 transition-all "
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