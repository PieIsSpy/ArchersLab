import { Clock } from "../components/Clock";
import { currentUser } from "../models/User";
import { ReservationTable } from "../components/ReservationTable";

export function Home () {
    return (
    <div className="m-5 w-1/2 mx-auto">
        <div className="google p-4 mt-4 rounded-2xl gray-67 shadow-lg flex items-center">
			
			<img
				className="rounded-full w-15 h-15 mr-5"
				src="./src/resources/karl.png"
				alt="Profile"
			/>
			<div>
				<h2 className="font-bold text-xl">Good day, {currentUser.name}!</h2>
				<h2 className="text-gray-500 text-l mt-1"><Clock /></h2>
			</div>

		</div>
        <h2 className="mt-12 font-black google text-4xl">Current Reservations:</h2>
        <div className="px-4 mt-4 rounded-2xl gray-67 shadow-lg">
            <ReservationTable student={currentUser}/>
        </div>
    </div>);
}