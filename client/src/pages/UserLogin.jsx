import { useState } from "react";

export function UserLogin() {
	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (form.password !== form.confirmPassword) {
		alert("Passwords do not match");
		return;
		}
		console.log("Admin account created:", form);
		// Pls add API call here
	};

	const inputClass =
		"w-full px-[10px] py-[6px] rounded-xl gray-89 text-sm font-['Inter',sans-serif] box-border " +
		"focus:outline-none focus:ring-2 focus:ring-[#145b92] focus:border-[#145b92]";

	return (
		<div className="w-1/3 mx-auto my-45">
			<div className="mb-4">
				<div className="text-5xl google font-bold">User Login</div>
			</div>
			<form
			onSubmit={handleSubmit}
			className="w-full flex flex-col items-center space-y-4 gray-67 rounded-2xl shadow-md p-4"
			>
				<div className="flex flex-col w-full">
					<label className="font-bold text-xs mb-1">Email</label>
					<input
					type="email"
					name="email"
					value={form.email}
					onChange={handleChange}
					className={inputClass}
					placeholder="Enter email"
					/>
				</div>

				<div className="flex flex-col w-full">
					<label className="font-bold text-xs mb-1">Password</label>
					<input
					type="password"
					name="password"
					value={form.password}
					onChange={handleChange}
					className={inputClass}
					placeholder="Enter password"
					/>
				</div>

				<div className="flex justify-center mt-4">
					<button
					type="submit"
					className="px-[15px] py-[5px] bg-[#145b92] p-3 rounded-xl transition-all hover:scale-102 active:scale-100 active:shadow-inner select-none text-white"
					>
					Login
					</button>
				</div>
			</form>
		</div>
	);
}