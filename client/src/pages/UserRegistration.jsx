import { useState } from "react";
import { useNavigate } from 'react-router-dom'

export function UserRegistration() {
	const navigate = useNavigate()

	const [form, setForm] = useState({
		name: "",
		id: '',
		email: "",
		password: "",
		confirmPassword: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name === "name") {
			if (!/^[a-zA-Z\s]*$/.test(value)) return;
		}

		if (name === "id") {
			if (!/^\d*$/.test(value)) return;
			if (value.length > 8) return;
		}

		setForm({ ...form, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!form.name || !form.id || !form.email || !form.password || !form.confirmPassword) {
			alert('Please fill out missing fields')
			return;
		}
		else if (form.id.length !== 8 || isNaN(Number(form.id))) {
			alert("Invalid ID");
			return;
		}
		else if (form.password !== form.confirmPassword) {
			alert("Passwords do not match");
			return;
		}

		const newUser = {
			name: form.name,
			nickname: '',
			id: Number(form.id),
			bio: '',
			email: form.email,
			college: '',
			program: '',
			about: '',
			pfp_url: '',
			password: form.password,
			isAdmin: false
		}

		console.log(newUser)

		try {
			const response = await fetch('http://localhost:5000/api/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newUser)
			})

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message || "Failed to create account")
			}
			else
			{
				alert('Successfully created account!')
				navigate('/UserLogin')
			}
		} catch (err) {
			console.error("Error:", err);
			alert(err)
		}

	};

	const inputClass =
		"w-full px-[10px] py-[6px] rounded-xl gray-89 text-sm font-['Inter',sans-serif] box-border " +
		"focus:outline-none focus:ring-2 focus:ring-[#145b92] focus:border-[#145b92]";

	return (
		<div className="w-1/3 mx-auto my-45">
			<div className="mb-4">
				<div className="text-5xl google font-bold">User Registration</div>
				<div className="google mt-2 text-gray-400">
					Please fill up the form below to create an account.
				</div>
			</div>
			<form
			onSubmit={handleSubmit}
			className="w-full flex flex-col items-center space-y-4 gray-67 rounded-2xl shadow-md p-4"
			>
				<div className="flex flex-col w-full">
					<label className="font-bold text-xs mb-1">Name</label>
					<input
					type="text"
					name="name"
					value={form.name}
					onChange={handleChange}
					className={inputClass}
					placeholder="Enter full name"
					/>
				</div>

				<div className="flex flex-col w-full">
					<label className="font-bold text-xs mb-1">ID</label>
					<input
					type="text"
					name="id"
					value={form.id}
					onChange={handleChange}
					className={inputClass}
					placeholder="Enter ID Number"
					/>
				</div>

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

				<div className="flex flex-col w-full">
					<label className="font-bold text-xs mb-1">Confirm Password</label>
					<input
					type="password"
					name="confirmPassword"
					value={form.confirmPassword}
					onChange={handleChange}
					className={inputClass}
					placeholder="Confirm password"
					/>
				</div>

				<div className="flex justify-center mt-4">
					<button
					type="submit"
					className="px-[15px] py-[5px] bg-[#145b92] p-3 rounded-xl transition-all hover:scale-102 active:scale-100 active:shadow-inner select-none text-white"
					>
					Create Account
					</button>
				</div>
			</form>
		</div>
	);
}