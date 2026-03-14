import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../dark-datepicker.css";
import { rooms } from "../../models/Room";

class ReservationClass {
	constructor(user, date, time, room, seats, status, isAnnonymous) {
		this.user = user;
		this.date = date;
		this.time = time;
		this.room = room;
		this.status = status
		this.isAnnonymous = isAnnonymous;
	}
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

let list = [
	new ReservationClass("Omandac, K.", new Date("2025-02-16T11:14:00"), "6:00AM-7:00AM", "GK201", [11, 12], "Upcoming", 0),
	new ReservationClass("Tee, J.", new Date("2025-02-16T11:14:00"), "7:00AM-8:00AM", "GK201", [11, 12], "Cancelled", 0),
]

function Reservation() {
	return list.map((res, index) => (
		<tr key={`${index}`} className="border-t-2 border-gray-67">
		<td>{res.date.toLocaleDateString()}</td>
		<td>{res.time}</td>
		<td>{res.room}</td>
		<td className="flex items-center gap-2">{res.user}
			<button className="flex items-center gap-2 transition-all duration-200">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					className="flex-shrink-0 w-5 h-5"
				>
					<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
				</svg>
			</button>
		</td>
		<td>{res.status}</td>
		<td className="flex items-center gap-2">
			{res.status === "Upcoming" ? (
				<button className="ml-auto flex items-center gap-2 text-red-400 hover:text-red-600 hover:scale-105 transition-all duration-200">
					Cancel
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
			) : null}
		</td>
		</tr>
	))
}

export function ReservationTable() {
	return (
		<table className="table-auto w-full text-left">
			<thead className="font-bold border-b border-gray-600">
				<tr>
					<th className="w-1/5">
						Date
					</th>
					<th className="w-1/5">
						Time
					</th>
					<th className="w-1/5">
						Room
					</th>
					<th className="w-1/5">
						Requester
					</th>
					<th className="w-1/21">
						Status
					</th>
					<th>
					</th>
				</tr>
			</thead>
			<tbody>
				<Reservation/>
			</tbody>
		</table>
	)
}

export function RoomReservations () {
	const formcontrol =
		"gray-89 text-xl text-center px-3 h-10 w-43 rounded-xl bg-transparent " +
		"focus:outline-none focus:ring-2 focus:ring-[#145b92] focus:border-[#145b92] " +
		"selection:bg-blue-300 selection:text-black";

		return (
		<div className="m-5 w-2/3 mx-auto my-40">
			<h2 className="font-black google text-5xl mb-5">Room Reservation Requests</h2>
			{/* Outer Div that holds DATE ROOM TIMESLOT + REQ btn */}
			<div className="p-4 gray-67 flex flex-col rounded-2xl">
				<h2 className="google text-3xl text-gray-400 mb-3">Filter by</h2>
					{/* Inner Div that holds DATE ROOM TIMESLOT */}
					<div className="justify-center items-center rounded-2xl text-2xl google flex gap-12 w-full">
						
						{/* Inner Div that holds DATE */}
						<div className="gap-2 flex flex-row">
							<div className="text-xl google flex items-center justify-center">
								Date:
							</div>
							<div className="text-xl flex items-center justify-center">
								<DatePicker
									className={formcontrol}
									selected={null}
									onChange={null}
									minDate={null}
									maxDate={null}
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
									className={formcontrol}
							value={null}
							onChange={(e) => {
							}}
							>
							{optionRoom}
							</select>
						</div>

						{/* Inner Div that holds NAME */}
						<div className="gap-2 flex flex-row">
							<div className="text-xl google flex items-center justify-center">
								Name:
							</div>
							<input
								className={formcontrol}
							/>
						</div>
					</div>
			</div>
			<div className="px-4 mt-4 rounded-2xl gray-67 shadow-lg">
				<ReservationTable/>
			</div>
		</div>);
}