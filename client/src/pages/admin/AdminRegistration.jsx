import { useState } from "react";
import { useNavigate } from 'react-router-dom'

import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

import { Button } from "../../components/Input";
import { FormInput, FormLayout } from "../../components/Form";

import { createAccount } from "../../services/userServices";

export function AdminRegistration() {
	const {currentUser} = useContext(UserContext)
	const navigate = useNavigate()
	const [form, setForm] = useState({
		name: "",
		id: null,
		email: "",
		password: "",
		confirmPassword: "",
	});

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!form.name || !form.email || !form.password || !form.confirmPassword) {
			alert('Please fill out missing fields')
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
			isAdmin: true
		}

		try {
			await createAccount(newUser);

			alert('Successfully created account!')
			navigate(`/Profile/${currentUser.id}`)
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<FormLayout
			title="Admin Registration"
			subtitle="Create an account with administrator privileges."
			onSubmit={handleSubmit}
		>
				<FormInput 
					label="Name"
					type="text"
					name="name"
					value={form.name}
					onChange={handleChange}
					placeholder="Enter full name"
				/>

				<FormInput 
					label="ID"
					type="text"
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

				<FormInput 
					label="Password"
					type="password"
					name="password"
					value={form.password}
					onChange={handleChange}
					placeholder="Enter password"
				/>

				<FormInput 
					label="Confirm Password"
					type="password"
					name="confirmPassword"
					value={form.confirmPassword}
					onChange={handleChange}
					placeholder="Confirm password"
				/>

				<Button type="submit" label="Create Admin Account"/>
		</FormLayout>
	);
}