import { Clock } from "../components/Clock";
import { initialStudent } from "../models/Student";

export function Home () {
    return (
    <div className="m-5">
        <div className="google">
            <h2 className="font-bold text-xl">Good day, {initialStudent.name}!</h2>
            <h2 className="ml-auto text-gray-500 text-l"><Clock /></h2>
        </div>
        <h2 className="mt-12 font-black google text-4xl">Current Reservations:</h2>
        <div className="mt-4 pl-4 pr-4 rounded-2xl gray-67 shadow-lg">
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
                    <tr className="border-b border-gray-600">
                        <td>2/16/2025</td>
                        <td>6:00AM-7:00AM</td>
                        <td>GK201</td>
                        <td>30/41</td>
                        <td>1 1, 1 2</td>
                        <td>Cancelled</td>
                        <td className="flex items-center gap-2">
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
                        </td>
                    </tr>
                    
                    <tr>
                        <td>2/16/2025</td>
                        <td>6:00AM-7:00AM</td>
                        <td>GK201</td>
                        <td>30/41</td>
                        <td>1 1, 1 2</td>
                        <td>Cancelled</td>
                        <td className="flex items-center gap-2 ">
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
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>);
}