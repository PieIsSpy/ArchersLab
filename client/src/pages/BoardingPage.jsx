import { useState } from "react";

export function BoardingPage() {
	return (
		<div className="mx-auto">
			<div className="flex flex-col items-center justify-center">
				<h1 className="text-5xl google font-bold">Welcome to ArchersLab!</h1>
				<div className="gray-89">A lab reservation system that works for <span>you</span>.</div>

				<div className="mt-20 flex gap-8">
					<button 
						className="p-2 w-30 bg-[#145b92] rounded-xl select-none justify-center"
					>
						Sign up
					</button>
					<button
						className="border w-30 p-2 rounded-xl flex justify-center"
					>
						Log in
					</button>
				</div>
			</div>
		</div>
	);
}