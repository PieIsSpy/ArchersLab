import { Clock } from "../components/Clock";
import { currentUser } from "../models/Student";
import { StudentReservationTable } from "../components/ReservationTable";

export function Home () {
    return (
    <div className="m-5">
        <div className="google">
            <h2 className="font-bold text-xl">Good day, {currentUser.name}!</h2>
            <h2 className="ml-auto text-gray-500 text-l"><Clock /></h2>
        </div>
        <h2 className="mt-12 font-black google text-4xl">Current Reservations:</h2>
        <div className="mt-4 pl-4 pr-4 rounded-2xl gray-67 shadow-lg">
            <StudentReservationTable/>
        </div>
    </div>);
}