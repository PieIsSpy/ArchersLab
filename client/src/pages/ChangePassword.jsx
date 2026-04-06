import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

import { FormPassword, FormLayout } from "../components/Form";
import { Button } from "../components/Input";

import { updateAccount } from "../services/userServices";

export function ChangePassword() {
	const {currentUser} = useContext(UserContext)
	const navigate = useNavigate();

	const [form, setForm] = useState({
		oldPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
			alert('Please enter missing fields')
			return;
		}

		if (form.newPassword !== form.confirmPassword) {
			alert("Passwords do not match");
			return;
		}
		
		try {
			const info = {
				oldPassword: form.oldPassword,
                password: form.newPassword
			}

			const response = await updateAccount(currentUser, info)

			if (response.ok) {
				alert('Password Successfully Updated');
            	navigate(`/Profile/${currentUser._id}`);
			} else {
				const errorData = await response.json();
            	alert(errorData.message || "Failed to update password");
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<FormLayout
			title="Change Password"
			subtitle="Need to secure your account? Change your password here."
			onSubmit={handleSubmit}
			children={
				<>
					<FormPassword 
						label="Old Password"
						type="password"
						name="oldPassword"
						value={form.oldPassword}
						onChange={handleChange}
						placeholder="Enter old password"
					/>

					<FormPassword
						label="New Password"
						type="password"
						name="newPassword"
						value={form.newPassword}
						onChange={handleChange}
						placeholder="Enter new password"
					/>

					<FormPassword
						label="Confirm Password"
						type="password"
						name="confirmPassword"
						value={form.confirmPassword}
						onChange={handleChange}
						placeholder="Confirm new password"
					/>

					<div className="flex gap-6">
						<Button
							type="submit"
							label="Change Password"
						/>

						<Link to ={`/Profile/${currentUser._id}`}>
							<Button
								type="button"
								label="Exit"
								color="gray"
							/>
						</Link>
					</div>
				</>
			}
		/>
	)
}