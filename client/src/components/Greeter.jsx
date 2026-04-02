import { useContext } from "react";
import { UserContext } from "../context/UserContext";

import { Clock } from "../components/Clock";
import defualt_pfp from "../resources/default.jpg"

export function Greeter(){
	const {currentUser} = useContext(UserContext)

	return <div className="google p-4 rounded-2xl gray-67 shadow-lg flex items-center">
				<img
					className="rounded-full w-15 h-15 mr-5 object-cover"
					src={currentUser.pfp_url ? currentUser.pfp_url : defualt_pfp}
					alt="Profile"
				/>
				<div>
					<h2 className="font-bold text-xl">Good day, {currentUser.name}!</h2>
					<h2 className="text-gray-500 text-l mt-1"><Clock /></h2>
				</div>
			</div>
}