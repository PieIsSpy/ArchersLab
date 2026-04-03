import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { FormInput, FormLayout, FormPassword } from "../components/Form";
import { Button, CheckBox } from "../components/Input";

import { loginAccount } from "../services/userServices";

export function UserLogin({setIsAuth, setAdmin, setUser}) {
	const [form, setForm] = useState({
		id: "",
		password: ""
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
			const remember = document.getElementById("remember").checked
			const response = await loginAccount(form.password, form.id, remember)

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
					name="id"
					value={form.id}
					onChange={handleChange}
					placeholder="Enter ID"
				/>
				<FormPassword
					value={form.password}
					onChange={handleChange}
					placeholder="Enter Password"
				/>
				<CheckBox
					type='checkbox'
					label="Remember Me "
					className="text-xs"
					id="remember"
				/>
				<div className="flex gap-6">
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