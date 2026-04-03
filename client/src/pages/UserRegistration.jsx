import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { Link, useParams } from "react-router-dom";

import { FormInput, FormPassword, FormLayout } from "../components/Form";
import { Button } from "../components/Input";

import { createAccount } from "../services/userServices";

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
			await createAccount(newUser);

			alert('Successfully created account!')
			navigate('/UserLogin')
		} catch (err) {
			console.error(err);
		}
	};

	const inputClass =
		"w-full px-[10px] py-[6px] rounded-xl gray-89 text-sm font-['Inter',sans-serif] box-border " +
		"focus:outline-none focus:ring-2 focus:ring-[#145b92] focus:border-[#145b92]";

	return (
		<FormLayout
			title="User Registration"
			subtitle="Please fill up the form below to create an account."
			onSubmit={handleSubmit}
		>
				<FormInput 
					label="Name"
					name="name"
					value={form.name}
					onChange={handleChange}
					placeholder="Enter full name"
				/>

				<FormInput 
					label="ID"
					name="id"
					value={form.id}
					onChange={handleChange}
					placeholder="Enter ID Number"
				/>

				<FormInput 
					label="Email"
					type="email"
					name="email"
					value={form.email}
					onChange={handleChange}
					placeholder="Enter email"
				/>

				<FormPassword 
					label="Password"
					name="password"
					value={form.password}
					onChange={handleChange}
					placeholder="Enter password"
				/>

				<FormPassword
					label="Confirm Password"
					name="confirmPassword"
					value={form.confirmPassword}
					onChange={handleChange}
					placeholder="Confirm password"
				/>
				<div className="flex gap-6">
					<Button
						type="submit"
						label="Create Account"
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