import { ReservationTable } from "../../components/ReservationTable";

export function IndividualReservations () {
	return (
	<div className="m-5">
		<h2 className="mt-12 font-black google text-4xl">All Reservations:</h2>
		<div className="px-4 mt-4 rounded-2xl gray-67 shadow-lg">
			<ReservationTable/>
		</div>
	</div>);
}