import { currentUser } from "../models/User";
import { reservations } from "../models/Reservation";

function StudentReservation({student, reservations}) {
    let list = student ? reservations.filter(res => student.equals(res.user)) : reservations;

    return list.map((res, index) => (
        <tr key={`${index}`} className="border-t-2 border-gray-67">
        <td>{res.date.toLocaleDateString()}</td>
        <td>{res.time}</td>
        <td>{res.room}</td>
        <td>30/41</td>
        <td>{res.seats.join(", ")}</td>
		{!student ? 
			<td className="flex items-center gap-2">{res.user.name}
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
			</td> : <></>
		}
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

export function ReservationTable({student}) {
    return (
        <table className="table-auto w-full text-left">
            <thead className="font-bold border-b border-gray-600">
                <tr>
                    <th className="w-1/7">
                        Date
                    </th>
                    <th className="w-1/7">
                        Time
                    </th>
                    <th className="w-1/7">
                        Room
                    </th>
                    <th className="w-1/7">
                        Capacity
                    </th>
                    <th className="w-1/7">
                        Seats Reserved
                    </th>
					{!student ? 
						<th className="w-1/7">
							User
						</th> : <></>
					}
                    <th className="w-1/7">
                        Status
                    </th>
                    <th className="w-1/21">
                    </th>
                </tr>
            </thead>
            <tbody>
                <StudentReservation student={student} reservations={reservations}/>
            </tbody>
        </table>
    )
}