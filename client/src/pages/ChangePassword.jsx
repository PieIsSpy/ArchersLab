import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

import { FormInput, FormLayout } from "../components/Form";

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
		if (form.newPassword !== form.confirmPassword) {
			alert("Passwords do not match");
			return;
		}
		
		try {
			const info = {
				oldPassword: form.oldPassword,
                password: form.newPassword
			}

			await updateAccount(currentUser, info)
			alert('Password Successfully Updated');
            navigate(`/Profile/${currentUser._id}`);
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
					<FormInput 
						label="Old Password"
						type="password"
						name="oldPassword"
						value={form.oldPassword}
						onChange={handleChange}
						placeholder="Enter old password"
					/>

					<FormInput
						label="New Password"
						type="password"
						name="newPassword"
						value={form.newPassword}
						onChange={handleChange}
						placeholder="Enter new password"
					/>

					<FormInput
						label="Confirm Password"
						type="password"
						name="confirmPassword"
						value={form.confirmPassword}
						onChange={handleChange}
						placeholder="Confirm new password"
					/>

					<div className="flex justify-center mt-4">
						<button
						type="submit"
						className="px-[15px] py-[5px] bg-[#145b92] p-3 rounded-xl transition-all hover:scale-102 active:scale-100 active:shadow-inner select-none text-white"
						>
						Change Password
						</button>
					</div>
				</>
			}
		/>
	)
}