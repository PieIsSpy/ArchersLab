import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function BoardingPage() {
	const navigate = useNavigate();

	return (
		<div className="bg-[#00000060] h-screen w-screen">
			<img className="absolute z-0 h-screen w-screen top-0 left-0 blur-lg" src="src/resources/dlsu-jubilee.webp"></img>
			<div className="bg-[#000000AA] relative z-10 flex flex-col h-screen items-center justify-center">
				<h1 className="text-5xl google font-bold">Welcome to ArchersLab!</h1>
				<div>A lab reservation system that works for <span>you</span>.</div>

				<div className="mt-20 flex gap-8">
					<button 
						className="p-2 w-30 bg-[#145b92] rounded-xl select-none justify-center"
						onClick={() => navigate("/UserRegistration")}
					>
						Sign up
					</button>
					<button
						className="border w-30 p-2 rounded-xl flex justify-center"
						onClick={() => navigate("/UserLogin")}
					>
						Log in
					</button>
				</div>
			</div>
		</div>
	);
}