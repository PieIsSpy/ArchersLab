import { useState } from "react";

export function UserLogin({setIsAuth, setAdmin, setUser}) {
	const [form, setForm] = useState({
		id: null,
		password: null
	});

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name === "id") {
			if (!/^\d*$/.test(value)) return;
			if (value.length > 8) return;
		}

		setForm({ ...form, [name]: value });
	};


	const handleSubmit = async (e) => {
		e.preventDefault();
		
		try {
			const response = await fetch('http://localhost:5000/api/users/login', {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					id: Number(form.id),
					password: form.password
				}),
				credentials: 'include'
			})

			if (response.ok) {
				const data = await response.json();

				alert(`Welcome ${data.name}!`)

				setIsAuth(true);
				setAdmin(data.isAdmin);
				setUser(data)
			}
			else {
				alert('The user ID and password does not match')
			}
		} catch (err) {
			console.error("Failed to fetch data:", err);
		}
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
					<label className="font-bold text-xs mb-1">ID</label>
					<input
					type="text"
					name="id"
					value={form.id}
					onChange={handleChange}
					className={inputClass}
					placeholder="Enter ID"
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
					placeholder="Enter Password"
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