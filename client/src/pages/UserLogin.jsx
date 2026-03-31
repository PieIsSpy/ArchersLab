import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { FormInput, FormLayout } from "../components/Form";
import { Button } from "../components/Input";

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

	return (
		<FormLayout
			title="User Login"
			onSubmit={handleSubmit}
		>
				<FormInput label="ID"
					type="text"
					name="id"
					value={form.id}
					onChange={handleChange}
					placeholder="Enter ID"
				/>
				<FormInput label="Password"
					type="password"
					name="password"
					value={form.password}
					onChange={handleChange}
					placeholder="Enter Password"
				/>
				<div class="flex gap-6">
					<Button
						type="submit"
						label="Login"
					/>

					<Link to ="/">
						<Button
							type="button"
							label="Exit"
							color="gray"
						/>
					</Link>
				</div>
		</FormLayout>
	);
}