import { useState, useEffect } from "react";

import { useContext } from "react";
import { UserContext } from "../context/UserContext";

import { UpArrowSvg } from "../components/Svg";

import { Button, CancelButton, DarkDatePicker, Picker } from "../components/Input";

import { fetchFilteredReservations,modifyReservation } from "../services/reservationServices";

export function ReservationTable({view, mode='global', filter, filterBy}) {
    const {currentUser} = useContext(UserContext)

	const [sort, setSort] = useState("");
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

	const settings = {
		id: mode === 'profile' ? view : null,
		ignoreAnonymous: !currentUser?.isAdmin, 
		redactAnonymous: !currentUser?.isAdmin
	}
    useEffect(() => {
		setLoading(true);
        const loadData = async() => {
			try {
				// const reservationData = await fetchReservations();

				const reservationData = await fetchFilteredReservations(settings);
				setReservations(reservationData)
			} catch (err) {
				console.error(err)
			} finally {
				setLoading(false)
			}
		}

		loadData();
    }, [view, mode, currentUser]);

	function ReservationTableBody({reservations, sort, filter, filterBy, mode, view}) {
		const {currentUser} = useContext(UserContext)

		if (currentUser && reservations.length > 0) {
			const now = new Date();

			reservations.forEach(res => {
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
				case 'date':
					reservations.sort((a, b) => a.date.toString().localeCompare(b.date.toString()));
					break;

				case 'time':
					reservations.sort((a, b) => {
						const [aStart] = a.time.split('-');
						const [bStart] = b.time.split('-');
						const [aH, aM] = aStart.split(':').map(Number);
						const [bH, bM] = bStart.split(':').map(Number);
						return aH !== bH ? aH - bH : aM - bM;
					});
					break;

				case 'room':
					reservations.sort((a, b) => a && b ? (a.room._id).localeCompare(b.room._id) : 0);
					break;

				case 'reason':
					reservations.sort((a, b) => a && b ? (a.reason).localeCompare(b.reason) : 0);
					break;

				case 'status':
					const rank = { "Pending": 1, "Upcoming": 2, "Ongoing": 3, "Cancelled": 4, "Completed": 5 };
					reservations.sort((a, b) => (rank[a.status] || 99) - (rank[b.status] || 99));
					break;

				case 'user':
					reservations.sort((a, b) => {
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
					list = reservations.filter(res => {
						const d = new Date(res.date);
						return (
							d.getFullYear() === target.getFullYear() &&
							d.getMonth() === target.getMonth() &&
							d.getDate() === target.getDate()
						);
					});
				}

				if (filter[1])
					list = reservations.filter(res => res.room._id === filterBy[1]);

				if (filter[2] && filterBy[2]) {
					const query = filterBy[2].toLowerCase();
					list = reservations.filter(res => (res.user?.name || "").toLowerCase().includes(query));
				}
			}

			console.log(reservations)

			
			return reservations.map((res, index) => {
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
								onClick={async () => 
								{
									await modifyReservation("approve", res._id)
									setReservations(await fetchFilteredReservations(settings))
								}
							}
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
								await modifyReservation("cancel", res._id)
								setReservations(await fetchFilteredReservations(settings))
								console.log("onclick activateed");
							}}/>
						) : null
						
						}
					</td>
				</tr>)
			});
		}
	}

	function capitalize(str) {
		if (!str) return "";
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	function TableHeader(
		label
	){
		return (<th className="w-1/5 hover:bg-[#2e2e31] transition-colors ease-in duration-100 p-4"
			onClick={() => setSort(label)}>
			<div className="flex flex-row items-center gap-2">
				{capitalize(label)}
				{sort===label && sort != "Selected Seats"?<UpArrowSvg/>:null}
			</div>
		</th>);
	} 

    if (loading) return <div>Loading reservations...</div>;
    return (
		<div className="max-h-[50vh] overflow-auto rounded-lg">
			<table className="table-auto w-full text-left">	        
				<thead className="font-bold border-gray-600 sticky gray-67 top-0">
					<tr>
						{TableHeader("date")}
						{TableHeader("time")}
						{TableHeader("room")}
						{mode === "room" ? TableHeader("reason") : TableHeader("Selected Seats")}
						{mode === "global" && currentUser.isAdmin && TableHeader("User")}
						{TableHeader("status")}
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