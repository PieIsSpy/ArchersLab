import { currentUser } from "../models/Student";

function ListStudentReservations({student}) {
    return student.reservations.map((res, index) => (
        <tr key={`${res.date}-${res.time}`} className="border-t-2 border-gray-67">
            <td>{res.date.toLocaleDateString()}</td>
            <td>{res.time}</td>
            <td>{res.room}</td>
            <td>30/41</td>
            <td>{res.seats.join(", ")}</td>
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

export function StudentReservationTable() {
    return (
        <table className="table-auto w-full text-left">
            <thead className="font-bold border-b border-gray-600">
                <tr>
                    <th>
                        Date
                    </th>
                    <th>
                        Time
                    </th>
                    <th>
                        Room
                    </th>
                    <th>
                        Capacity
                    </th>
                    <th>
                        Seats Reserved
                    </th>
                    <th>
                        Status
                    </th>
                    <th>
                    </th>
                </tr>
            </thead>
            <tbody>
                <ListStudentReservations student={currentUser}/>
            </tbody>
        </table>
    )
}