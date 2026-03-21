import { useState, useEffect } from "react";

import { useContext } from "react";
import { UserContext } from "../context/UserContext";

import { Room } from "../models/Room"
import { Reservation } from "../models/Reservation";
import { userJSON_to_Object } from "../models/User";

function ReservationTableBody({reservations, sort, filter, filterBy, room}) {
	const {currentUser} = useContext(UserContext)

	if (currentUser && reservations.length > 0) {
		const now = new Date();

/*
		Is this an admin? If not, then filter by user id
		Are we looking for room reservations? If not, then remove 'empty reservations
*/
		
		var list = !currentUser.isAdmin
			? reservations.filter(res => currentUser._id === res.user?._id || currentUser.name === res.user.name) 
			: !room ? reservations.filter(res => res.seats.length != 0) : reservations.filter(res => res.seats.length == 0)

		list.forEach(row => {
			const date = new Date(row.date); // assuming row[1] is the date
			const [hour, minute] = row.time.split('-')[0].split(':').map(Number); // assuming row[2] is "HH:mm-HH:mm"
			date.setHours(hour, minute, 0, 0);

			const status = date < now ? "Completed" : "Upcoming";
			if (!row.status) row.status = status;
		});

		switch(sort) {
			case 'date-sort':
				list.sort((a, b) => a.date - b.date);
				break;

			case 'time-sort':
				list.sort((a, b) => {
					const [aStart] = a.time.split('-');
					const [bStart] = b.time.split('-');
					const [aH, aM] = aStart.split(':').map(Number);
					const [bH, bM] = bStart.split(':').map(Number);
					return aH !== bH ? aH - bH : aM - bM;
				});
				break;

			case 'room-sort':
				list.sort((a, b) => a && b ? (a.name).localeCompare(b.name) : 0);
				break;

			case 'status-sort':
				const rank = { "Upcoming": 1, "Ongoing": 2, "Cancelled": 3, "Completed": 4 };
				list.sort((a, b) => (rank[a.status] || 99) - (rank[b.status] || 99));
				break;

			case 'user-sort':
				list.sort((a, b) => {
					const nameA = (a.user.name || a.user || "").toUpperCase();
					const nameB = (b.user.name || b.user || "").toUpperCase();
					return nameA.localeCompare(nameB);
				});
				break;

			default:
				break;
		}

		if (filter)
		{
			if (filter[0] && filterBy[0]) {
				const target = new Date(filterBy[0]);
				list = list.filter(res => {
					const d = new Date(res.date);
					return (
						d.getFullYear() === target.getFullYear() &&
						d.getMonth() === target.getMonth() &&
						d.getDate() === target.getDate()
					);
				});
			}

			if (filter[1])
				list = list.filter(res => res.room._id === filterBy[1]);

			if (filter[2] && filterBy[2]) {
				const query = filterBy[2].toLowerCase();
				list = list.filter(res => (res.user?.name || "").toLowerCase().includes(query));
			}
		}

		return list.map((res, index) => (
			<tr key={index} className="border-t-2 border-gray-67">
				<td>{res.date.toDateString()}</td>
				<td>{res.time}</td>
				<td>{res.room.name}</td>
				{!room ? <td>{res.seats.length != 0 ? res.seats.join(", ") : "Entire Room"}</td>
				: <td>{res.reason}</td>}
				{currentUser.isAdmin && (
					<td className="flex items-center gap-2">
						{res.user ? res.user.name : res.inpersonInfo ? res.inpersonInfo.name : "Anonymous"}
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
				)}
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
					):res.status === "Pending" ? (
						<button className="ml-auto flex items-center gap-2 text-green-400 hover:text-green-600 hover:scale-105 transition-all duration-200">
							Approve
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
					):null}
				</td>
			</tr>
		));
	}
}

export function ReservationTable({filter, filterBy, room}) {
	const [sort, setSort] = useState("");

	const [users, setUsers] = useState([]);
    const {currentUser} = useContext(UserContext)
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    // const fetchReservations = async () => {
    //     const reservationsUrl = 'http://localhost:5000/api/reservations';
	// 	const usersUrl = 'http://localhost:5000/api/users';
    //     try {
    //         const [reservationsFetch, usersFetch] = await Promise.all([
    //             fetch(reservationsUrl),
	// 			fetch(usersUrl)
    //         ]);

    //         const reservationsData = await reservationsFetch.json();
    //         const usersData = await usersFetch.json();

	// 		setReservations(reservationsData)
	// 		setUsers(usersData)
			
    //         setLoading(false);
    //     } catch (error) {
    //         console.error("Failed to fetch data:", error);
    //         setLoading(false);
    //     }
    // };

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

			const roomInstances = roomsData
				.map(item => new Room(item._id, item.row, item.col, item.layout))
				.sort((a, b) => a.name.localeCompare(b.name));

			const reservationInstances = reservationsData.map(res => {
				const userData = res.user ? res.user : res.inpersonInfo;
				
				return new Reservation(
					userJSON_to_Object(userData),
					new Date(res.date),
					res.time,
					roomInstances.find(r => r.name === (res.room._id)),
					res.seats,
					res.resStatus,
					res.reason,
					res.isAnonymous,
					res._id
				)
			});

			setReservations(reservationInstances)
			console.log(reservationInstances)
			setLoading(false);
		} catch (error) {
			console.error("Failed to fetch data:", error);
			setLoading(false);
		}
	};

    useEffect(() => {
        fetchReservations();
    }, []);

	let th_class = "hover:bg-[#2e2e31] transition-colors ease-in duration-100 p-4";
	let th_div = "flex flex-row";

    if (loading) return <div>Loading reservations...</div>;
    return (
		<div className="max-h-[50vh] overflow-auto rounded-lg">
			<table className="table-auto w-full text-left">	        
				<thead className="font-bold border-gray-600 sticky gray-67 top-0"><tr>
						<th className={th_class} onClick={() => setSort("date-sort")}>
							<div className={th_div}>
								Date
								{sort==='date-sort'?<svg className="ml-2 w-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#c5c5c5"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289L19.7071 14.2929C20.0976 14.6834 20.0976 15.3166 19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071L12 9.41421L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7Z" fill="#c5c5c5"></path> </g></svg>
							:<div className="ml-2 w-4 w-4"></div>}</div>
						</th>
						<th className={th_class} onClick={() => setSort("time-sort")}>
							<div className={th_div}>
								Time
								{sort==='time-sort'?<svg className="ml-2 w-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#c5c5c5"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289L19.7071 14.2929C20.0976 14.6834 20.0976 15.3166 19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071L12 9.41421L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7Z" fill="#c5c5c5"></path> </g></svg>
							:<div className="ml-2 w-4 w-4"></div>}</div>
						</th>
						<th className={th_class} onClick={() => setSort("room-sort")}>
							<div className={th_div}>
								Room
								{sort==='room-sort'?<svg className="ml-2 w-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#c5c5c5"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289L19.7071 14.2929C20.0976 14.6834 20.0976 15.3166 19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071L12 9.41421L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7Z" fill="#c5c5c5"></path> </g></svg>
							:<div className="ml-2 w-4 w-4"></div>}</div>
						</th>
						{!room ? <th>Seats Reserved</th> : <th>Reason</th>}


						{currentUser.isAdmin && <th className={th_class} onClick={() => setSort("user-sort")}>
							<div className={th_div}>
								User
								{sort==='user-sort'?<svg className="ml-2 w-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#c5c5c5"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289L19.7071 14.2929C20.0976 14.6834 20.0976 15.3166 19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071L12 9.41421L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7Z" fill="#c5c5c5"></path> </g></svg>
							:<div className="ml-2 w-4 w-4"></div>}</div>
						</th>}
						<th className={th_class} onClick={() => setSort("status-sort")}>
							<div className={th_div}>
								Status
								{sort==='status-sort'?<svg className="ml-2 w-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#c5c5c5"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289L19.7071 14.2929C20.0976 14.6834 20.0976 15.3166 19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071L12 9.41421L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7Z" fill="#c5c5c5"></path> </g></svg>
							:<div className="ml-2 w-4 w-4"></div>}</div>
						</th>

						<th></th>
					</tr>
				</thead>
				<tbody>
					<ReservationTableBody
						reservations={reservations}
						users={users}
						sort={sort}
						filter={filter}
						filterBy={filterBy}
						room={room}
					/>
				</tbody>
			</table>
		</div>
    );
}