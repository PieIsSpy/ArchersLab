import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// components
import { PencilSvg } from "./components/PencilSvg.jsx";

// pages
import { Home } from "./pages/Home.jsx";

import { initialStudent } from "./models/Student.jsx";






const fields = [
  { label: "NAME", key: "name", editable: false, display: false},
  { label: "ID", key: "id", editable: false, display: true},
  { label: "BIO", key: "bio", editable: true, display: false},
  { label: "EMAIL", key: "email", editable: true, display: true},
  { label: "COLLEGE", key: "college", editable: true, display: true},
  { label: "COURSE", key: "course", editable: true, display: true},
  { label: "ABOUT", key: "about", editable: true, display: true},
];

export function StudentProfile() {
	const [student, setStudent] = useState(initialStudent);

	return (
		<div className="space-y-2">
			{fields.map((field) => (
				field.display ? (
					<div
						key={field.key}
						className="my-2 rounded-2xl gray-89 p-2 transition-transform transform hover:scale-103"
					>
						<h2 className="font-bold text-xs">{field.label}</h2>
						<h1>{student[field.key]}</h1>
					</div>
				):
				(<div></div>)
			))}
		</div>
	);
}

export function StudentForm({ student, handleToggle }) {
	const [formData, setFormData] = useState({ ...student });

	const handleSave = () => {
		Object.keys(formData).forEach((key) => {
			student[key] = formData[key];
		});
		// alert("Profile updated!");
		handleToggle();
	};

  	return (
		<div className="space-y-2">
		{fields.map((field) => (
			field.editable ? (
				<div
					key={field.key}
					className="my-2 rounded-2xl gray-89 p-2 transition-transform transform hover:scale-103"
				>
				<h2 className="font-bold text-xs">{field.label}</h2>
				<input 
					type="text" 
					value={formData[field.key]}
					onChange={(e) => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))} 
					className="w-full border-b border-gray-700 gray-89 focus:outline-none focus:border-blue-800 text-gray-900"
				/>
				</div>
			) : (
				<div
					key={field.key}
					className="my-2 rounded-2xl gray-89 p-2 transition-transform transform hover:scale-103 cursor-not-allowed"
				>
				<h2 className="font-bold text-xs">{field.label}</h2>
				<h1>{student[field.key]}</h1>
				</div>
			)
		))}
			<div className="flex gap-2 justify-center mt-4">
					<button 
					className="border p-2 rounded-xl flex items-center 
					transition transform active:scale-95"
					onClick={handleSave}>
					Save
				</button>
				<button 
					className="border p-2 rounded-xl flex items-center 
					transition transform active:scale-95"
					onClick={handleToggle}>
					Discard
				</button>
			</div>
		</div>
  	);
}

function Profile() {
	const [showFirst, setShowFirst] = useState(true);

	const handleToggle = () => {
		setShowFirst((prev) => !prev);
	};
	
	return(
		<div className="m-5 flex">
			{showFirst ? (
			<div className="mx-auto rounded-2xl pb-2 gray-67 flex flex-col items-center w-90">
				<img className="mt-10 mb-5 rounded-full w-40" src="./src/resources/karl.png"></img>
				<h1 className="text-3xl mb-6 google font-bold">Karl Deejay Omandac</h1>
				<div className="text-center mb-6">
					<h2 className="font-[serif] italic text-xl">{initialStudent.bio}</h2>
				</div>
				<div className="w-full px-2 google">
					<StudentProfile />
				</div>
				<button 
					className="border p-2 rounded-xl flex items-center 
					transition transform active:scale-95 "
					onClick={handleToggle}>
					<PencilSvg /> Edit Profile
				</button>
			</div>
			) : (
			<div className="mx-auto rounded-2xl pb-2 gray-67 flex flex-col items-center w-90">
				<img className="mt-10 mb-5 rounded-full w-40" src="./src/resources/karl.png"></img>
				<button
					className="
					relative -mt-10 mr-30
					gray-89 text-white
					px-2 py-1 text-sm rounded flex items-center space-x-1
					">
					<PencilSvg />Edit
				</button>		
				<div className="w-full mt-4 px-2 google">
        			<StudentForm student={initialStudent} handleToggle={handleToggle} />
				</div>
			</div>

			)}

		</div>
	);
}

function Reservations(){
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

export default function App() {
	return ( 
		<Router>
			<div>	
				<nav className="p-5 flex items-center border-b border-gray-700">
					<h1 className="text-2xl font-bold google">
							ArchersLab <span className="bg-linear-to-r from-cyan-500 to-blue-500
								bg-clip-text text-transparent animate-pulse">2</span>
					</h1>
					<a className="ml-10 text-l font" href="/">
							Dashboard
					</a>
					<a className="ml-10 text-l font" href="profile">
							Profile
					</a>
					<a className="ml-10 text-l font" href="reservations">
							Reservations
					</a>
					<a className="ml-10 text-l font">
							Request Room
					</a>
					<a className="ml-auto text-l font">
							Log Out
					</a>
				</nav>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/reservations" element={<Reservations />} />
				</Routes>
			</div>
		</Router>
	);
}