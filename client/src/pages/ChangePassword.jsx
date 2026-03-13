import { useState } from "react";

export function ChangePassword() {
	const [form, setForm] = useState({
		oldPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (form.newPassword !== form.confirmPassword) {
		alert("Passwords do not match");
		return;
		}
		console.log("Password change submitted:", form);
		// Pls add API call here
	};

	const inputClass =
		"w-full px-[10px] py-[6px] rounded-xl gray-89 text-sm font-['Inter',sans-serif] box-border " +
		"focus:outline-none focus:ring-2 focus:ring-[#145b92] focus:border-[#145b92]";

	return (
		<div className="w-1/3 mx-auto p-4 gray-67 rounded-2xl shadow-md my-10">
			<div className="my-7">
				<p className="text-5xl google font-bold">Change Password</p>
				Need to secure your account? Change your password here.
			</div>
			<form
			onSubmit={handleSubmit}
			className="w-full flex flex-col items-center space-y-4 mb-6"
			>
			<div className="flex flex-col w-full">
				<label className="font-bold text-xs mb-1">Old Password</label>
				<input
				type="password"
				name="oldPassword"
				value={form.oldPassword}
				onChange={handleChange}
				className={inputClass}
				placeholder="Enter old password"
				/>
			</div>

			<div className="flex flex-col w-full">
				<label className="font-bold text-xs mb-1">New Password</label>
				<input
				type="password"
				name="newPassword"
				value={form.newPassword}
				onChange={handleChange}
				className={inputClass}
				placeholder="Enter new password"
				/>
			</div>

			<div className="flex flex-col w-full">
				<label className="font-bold text-xs mb-1">Confirm Password</label>
				<input
				type="password"
				name="confirmPassword"
				value={form.confirmPassword}
				onChange={handleChange}
				className={inputClass}
				placeholder="Confirm new password"
				/>
			</div>

			<div className="flex justify-center mt-2">
				<button
				type="submit"
				className="px-[15px] py-[5px] bg-[#145b92] p-3 rounded-xl transition-all hover:scale-102 active:scale-100 active:shadow-inner select-none text-white"
				>
				Submit
				</button>
			</div>
			</form>
		</div>
	);
}