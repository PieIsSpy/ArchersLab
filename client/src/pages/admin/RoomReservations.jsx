import { useState, useEffect } from "react";
import { Clock } from "../../components/Clock";
import { ReservationTable } from "../../components/ReservationTable";

import { Greeter } from "../../components/Greeter";
import { DarkDatePicker, Picker } from "../../components/Input";

import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

import { fetchRooms } from "../../services/roomServices";
import { BackspaceSvg } from "../../components/Svg";

export function RoomReservations () 
{
	const [loading, setLoading] = useState(true);

	const {currentUser} = useContext(UserContext)
	// console.log(currentUser)
	
	const [rooms, setRooms] = useState([]);
	const [filter, setFilter] = useState([]);
	const [filterBy, setFilterBy] = useState([]);

	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedRoom, setSelectedRoom] = useState(null);
	const [selectedUser, setSelectedUser] = useState(null);

	const handleDateChange = (newDate) => {
		setSelectedDate(newDate)
	};

	useEffect(() => {
		const loadData = async() => {
			setLoading(true);
			try {
				const roomData = await fetchRooms();
				
				setRooms(roomData)
			} catch (err) {
				console.error(err)
			} finally {
				setLoading(false)
			}
		}

		loadData();
	}, []);

	useEffect(() => {
		console.log (selectedDate)
		console.log (selectedRoom)
		console.log (selectedUser)
		setFilter([!!selectedDate, !!selectedRoom, !!selectedUser])
		setFilterBy([selectedDate,selectedRoom,selectedUser])
	}, [selectedDate, selectedRoom, selectedUser])

	if (loading) return <div className="mx-auto">Loading...</div>
	return (
		<div className="w-3/4 mx-auto">
			<Greeter/>
			<div>
				<h2 className="m-5 font-black google text-5xl">Room Reservations</h2>
				<div className="p-4 gray-67 flex flex-col rounded-2xl">
					<h2 className="google text-3xl text-gray-400 mb-3">Filter by</h2>
						<div className="justify-center items-center rounded-2xl text-2xl google flex gap-12 w-full">
							<div className="gap-2 flex flex-row items-center justify-center">
								<DarkDatePicker
									selected={selectedDate}
									onChange={handleDateChange}
									placeholderText="Select a date..."
								/>
								<div
									onClick={()=>setSelectedDate("")}>
									<BackspaceSvg/>
								</div>
							</div>

							<Picker
								className={
									selectedRoom && !selectedRoom._id ? "text-[#C5C5C5]" : "text-[#7A7A7B]"
								}
								label="Room:"
								value={selectedRoom ? selectedRoom._id : "" }
								onChange={(e) => {
									const room = rooms.find(r => r._id === e.target.value);
									if (room) 
										setSelectedRoom(room._id)
									else 
										setSelectedRoom(null);
								}}>
								<option value="">Select room...</option>
								{rooms.map((room) => (
									<option key={room._id} value={room._id}>
										{room._id}
									</option>
								))}
							</Picker>
							
							{/* Inner Div that holds NAME */}
							<div className="gap-2 flex flex-row items-center">
								<div className="text-xl google flex items-center justify-center">
									Name:
								</div>
								<input
									value={selectedUser}
									className={"gray-89 text-xl text-center px-3 h-10 w-43 rounded-xl bg-transparent " +
									"focus:outline-none focus:ring-2 focus:ring-[#145b92] focus:border-[#145b92] " +
									"selection:bg-blue-300 selection:text-black h-[50px]"}
									onChange={(e) => {
										setSelectedUser(e.target.value)
									}}
									placeholder="Input a user..."
								/>
								<div
									onClick={()=>setSelectedUser("")}>
									<BackspaceSvg/>
								</div>
							</div>
						</div>
				</div>
				<div className="px-4 mt-4 rounded-2xl gray-67 shadow-lg">
					<ReservationTable
						filter = {filter}
						filterBy = {filterBy}
						mode = {"room"}
					/>
				</div>
			</div>
		</div>
	);
}