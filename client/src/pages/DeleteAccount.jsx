import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useState } from "react";

import { FormPassword, FormLayout } from "../components/Form";
import { Button } from "../components/Input";

import { deleteAccount } from "../services/userServices";

export function DeleteAccount() {
    const {currentUser, setUser, setIsAuth, setAdmin} = useContext(UserContext)
    const navigate = useNavigate();

    const [form, setForm] = useState({
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!window.confirm('Are you sure? This will delete all your reservations!')) return;

        if (form.password !== form.confirmPassword) {
			alert("Passwords do not match");
			return;
		}
        
        try {
            const response = await deleteAccount(form.password, currentUser._id);

            const msg = await response.json();
            alert(msg.message);

            if (response.ok) {
                setUser(null);
                setIsAuth(false);
                setAdmin(false);
                navigate('/')
            }
            
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <FormLayout
            title="Delete Account"
            subtitle="WARNING! This deletes your account profile and data. Any reservations done prior to deletion are cancelled when your account is deleted."
            onSubmit={handleSubmit}
            children={
                <>
                    <FormPassword 
                        label="Password"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                    />

                    <FormPassword
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm password"
                    />

                    <div className="flex gap-6">
                        <Button
                            type="submit"
                            label="Delete Account"
                            color='red'
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