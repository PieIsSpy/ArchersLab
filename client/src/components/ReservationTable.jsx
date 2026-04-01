import { useState, useEffect } from "react";

import { useContext } from "react";
import { UserContext } from "../context/UserContext";

import { Button, CancelButton, DarkDatePicker, Picker } from "../components/Input";

import { fetchReservations,modifyReservation } from "../services/reservationServices";

export function ReservationTable({view, mode='global', filter, filterBy}) {
    const {currentUser} = useContext(UserContext)

	const [sort, setSort] = useState("");
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
		setLoading(true);
        const loadData = async() => {
			try {
				const reservationData = await fetchReservations();
				setReservations(reservationData)
			} catch (err) {
				
			} finally {
				setLoading(false)
			}
		}

		loadData();
    }, []);

	function ReservationTableBody({reservations, sort, filter, filterBy, mode, view}) {
		const {currentUser} = useContext(UserContext)

		if (currentUser && reservations.length > 0) {
			const now = new Date();

			// reservations.forEach(res => {console.log(res.user.id);console.log(currentUser._id)})

			var list = reservations.filter(res => {
				// console.log(view) // 12409294
				// console.log(mode) //profile
				if (mode === 'profile') {
					if (!(String(res.user?._id) === String(view))) return false;
				}
				
				const isOwnerOfRes = currentUser && String(res.user?._id) === String(currentUser._id);

				if (currentUser.isAdmin || isOwnerOfRes) {
					if (mode === 'room')
						if (res.seats.length == 0) 
							return true;
						else
							return false;
					
					if (currentUser.isAdmin)
						if (res.seats.length == 0)
							return false;

					return true;
				}

				return res.isAnonymous === false;
			});

			list.forEach(res => {
				const startDate = new Date(res.date);
				const [startHour, startMinute] = res.time.split('-')[0].split(':').map(Number);
				startDate.setHours(startHour, startMinute, 0, 0);

				const endDate = new Date(res.date);
				const [endHour, endMinute] = res.time.split('-')[1].split(':').map(Number);
				endDate.setHours(endHour, endMinute, 0, 0);

				res.status = 
				res.resStatus === "Approved" && startDate < now && endDate > now ? "Ongoing" : 
				res.resStatus === "Approved" && endDate < now ? "Completed" :
				res.resStatus === "Approved" ? "Upcoming" : res.resStatus 		
				;
			});

			// console.log(list)

			switch(sort) {
				case 'date-sort':
					list.sort((a, b) => a.date.toString().localeCompare(b.date.toString()));
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
					list.sort((a, b) => a && b ? (a.room._id).localeCompare(b.room._id) : 0);
					break;

				case 'reason-sort':
					list.sort((a, b) => a && b ? (a.reason).localeCompare(b.reason) : 0);
					break;


				case 'status-sort':
					const rank = { "Pending": 1, "Upcoming": 2, "Ongoing": 3, "Cancelled": 4, "Completed": 5 };
					list.sort((a, b) => (rank[a.status] || 99) - (rank[b.status] || 99));
					break;

				case 'user-sort':
					list.sort((a, b) => {
						const nameA = (a.user ? a.user.name : "").toUpperCase();
						const nameB = (b.user ? b.user.name : "").toUpperCase();
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

			console.log(list)

			
			return list.map((res, index) => {
				const isOwner = currentUser._id === res.user?._id;
				const isAdmin = currentUser.isAdmin;
				const canCancelUpcoming = res.status === "Upcoming" && (isOwner || isAdmin);
				const canManagePending = res.status === "Pending" && isAdmin;

				return (
				<tr key={index} className="border-t-2 border-gray-67">
					<td>{res.date.split('T')[0]}</td>
					<td>{res.time}</td>
					<td>{res.room._id}</td>
					{mode !="room" ? <td>{res.seats.length != 0 ? res.seats.join(", ") : "Entire Room"}</td>
					: <td>{res.reason}</td>}
					{(mode === 'global' && currentUser.isAdmin) && (
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
						{canManagePending ? (
						<>
							<button
								onClick={() => modifyReservation("approve", res._id)}
								className="ml-auto flex items-center gap-2 text-green-500"
							>
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

						</>
						) : null}
						
						{canCancelUpcoming || canManagePending ? (
							<CancelButton onClick={async () => {
								modifyReservation("cancel", res._id)
								setReservations(await fetchReservations())
								console.log("onclick activateed");
							}}/>
						) : null
						
						}
					</td>
				</tr>)
			});
		}
	}

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
						{mode === "room" ? <th className={th_class} onClick={() => setSort("reason-sort")}>
							<div className={th_div}>
								Reason
								{sort==='reason-sort'?<svg className="ml-2 w-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#c5c5c5"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289L19.7071 14.2929C20.0976 14.6834 20.0976 15.3166 19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071L12 9.41421L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7Z" fill="#c5c5c5"></path> </g></svg>
							:<div className="ml-2 w-4 w-4"></div>}</div>
						</th> : <th>Seats Reserved</th>}

						{mode === 'global' && currentUser.isAdmin && <th className={th_class} onClick={() => setSort("user-sort")}>
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
						mode={mode}
						view={view}
						sort={sort}
						filter={filter}
						filterBy={filterBy}
					/>
				</tbody>
			</table>
		</div>
    );
}