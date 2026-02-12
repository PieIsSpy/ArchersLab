import React from "react";

function Navbar() {
return (<nav class="p-5 flex items-center border-b border-gray-700">
				<h1 class="text-2xl font-bold google">
						ArchersLab <span class="bg-linear-to-r from-cyan-500 to-blue-500
							bg-clip-text text-transparent animate-pulse">2</span>
				</h1>
				<a class="ml-10 text-l font">
						Dashboard
				</a>
				<a class="ml-10 text-l font">
						Profile
				</a>
				<a class="ml-10 text-l font">
						Reservations
				</a>
				<a class="ml-10 text-l font">
						Request Room
				</a>
				<a class="ml-auto text-l font">
						Log Out
				</a>
			</nav>);
}

export default Navbar;