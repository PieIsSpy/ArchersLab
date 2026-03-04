import { useState } from "react";
import DatePicker from "react-datepicker";

export function Reservations(){
	// TODO
	// maximum 5 reservations only per room (make an error message)
	// reserve button will turn it (idk what color)
	// make hard coded data
	// ensure that an error pops up if you clicked on a booked seat
	// fix ui, everything must be centered add combobox for rooms
	// 2d array of seats
	// make sure that going back from profile to idk it doesnt reset the array
	// make sure for each date it has a 2d array of seats so its now [day][room][seat]
	// bawal sundays to book kasi walang pasok
	// dont forget the time ig... [day][room][seat][timeslot]
	// <reservation done>

	const row = document.createElement("tr");
	const [selectedDate, setSelectedDate] = useState(null);

	const DateChange = (date) => {
		setSelectedDate(date)
	};
	const mindate = () => new Date();

	const chosenSeatsList = []
	const selectedSeats = []; //stores a number


	function selectSeat(seatID){
		
		const element = document.getElementById(seatID);
		const table = document.getElementById("chosenSeatsTable");
		const existingRow = document.getElementById(`seat-row-${seatID}`); //will appear sa chosen seats 

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
	

	return(
		<div className="flex flex-row items-center rounded-2xl gap-7">
			<div className="flex items-center justify-center  flex flex-col">
				<div className="w-[800px] h-[100px] flex items-center justify-center">
						<DatePicker
						className="p-2 border rounded text-center"
						selected={selectedDate}
						onChange={DateChange}
						minDate={mindate()}
						dateFormat="MM/dd/yyyy"
						>
						</DatePicker>
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
					<button className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700">
						Reserve
					</button>
				</div>
			</div>
		</div>
	);
}