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

	const inputClass =
		"w-full px-[10px] py-[6px] rounded-xl gray-89 text-sm font-['Inter',sans-serif] box-border " +
		"focus:outline-none focus:ring-2 focus:ring-[#145b92] focus:border-[#145b92]";

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
					className={inputClass}
					placeholder="Enter full name"
				/>

				<FormInput 
					label="ID"
					type="text"
					name="id"
					value={form.id}
					onChange={handleChange}
					className={inputClass}
					placeholder="Enter ID Number"
				/>

				<FormInput 
					label="Email"
					type="email"
					name="email"
					value={form.email}
					onChange={handleChange}
					className={inputClass}
					placeholder="Enter email"
				/>

				<FormInput 
					label="Password"
					type="password"
					name="password"
					value={form.password}
					onChange={handleChange}
					className={inputClass}
					placeholder="Enter password"
				/>

				<FormInput 
					label="Confirm Password"
					type="password"
					name="confirmPassword"
					value={form.confirmPassword}
					onChange={handleChange}
					className={inputClass}
					placeholder="Confirm password"
				/>

				<Button type="submit" label="Create Admin Account"/>
		</FormLayout>
	);
}