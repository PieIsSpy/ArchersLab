import { useState, useEffect} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../dark-datepicker.css";

export function RequestRoom(){
	const timeSlots = [
		"07:30-09:00", "09:15-10:45", "11:00-12:30", "12:45-14:15", 
		"14:30-16:00", "16:15-17:45", "18:00-19:30",
	];
	const room = [
		"GK201", "GK202", "GK203", "GK204", "GK205",
		"GK206", "GK207", "GK208", "GK209", "GK210"
	];

	// Set states for React
	const [selectedDate, setSelectedDate] = useState(()=>{
		const today = new Date();
		return today;
	});
	const [timeValue, setTimeValue] = useState(timeSlots[0]);
	const [roomValue, setRoomValue] = useState(room[0])

	const DateChange = (date) => {
		setSelectedDate(date)
	};

	useEffect(() => {
		displayState();
	}, [selectedDate, roomValue, timeValue]);
	

	const selectedSeats = [];

	const today = new Date();
	const selected = new Date(selectedDate);

	today.setHours(0, 0, 0, 0);
	selected.setHours(0, 0, 0, 0);

	// Set indexes
	const dayIndex = Math.floor((selected - today) / (1000 * 60 * 60 * 24)); //subtracts current - reservation date
	const roomIndex = room.indexOf(roomValue);
	const timeIndex = timeSlots.indexOf(timeValue);

	// Set minimum and maximum date (earliest and latest)
	const minDate = () => {
		return today.setDate(today.getDate() + 14);
	};
	const maxdate = () => {
		return today.setDate(today.getDate() + 31);
	}

	const optionRoom = [];
	for (let i = 0; i< room.length; i++){
		optionRoom.push(
			<option
				key={i}
				value={room[i]}
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
			>
				{timeSlots[i]}
			</option>
		)
	}
	
	function displayState(){
		console.log("");
	}

	return(
		<div className="flex flex-col justify-center items-center rounded-2xl gap-3">
			<div className="text-4xl google mt-10 font-bold mr-135">
				Reserve a seat:		
			</div>
			<div className="flex flex-row gap-4">
				<div className="flex flex-row justify-center items-center rounded-2xl gap-8">
					<div className="flex items-center justify-center  flex flex-col gap-4">
						<div className="gray-67 justify-center items-center rounded-2xl text-2xl google flex items-center justify-center gap-8 w-[800px]">
							<div className="gap-2 flex flex-row justify-center items-center">
								<div className="text-xl google flex items-center justify-center">
									Date:
								</div>
								<div className="text-xl w-[150px] h-[100px] flex items-center justify-center">
									<DatePicker
										className="gray-89 text-xl w-full p-3 rounded-lg text-center"
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

							<label className="text-xl gap-3 flex flex-row justify-center items-center">
								<div>
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
						<div className="bg-[#145b92] p-3 rounded-xl transition-all hover:scale-110 active:scale-105 active:bg-[#02497F] active:shadow-inner select-none">
							Request Room Reservation
						</div>
					</div>
				</div>
			</div>

		</div>
	);
}