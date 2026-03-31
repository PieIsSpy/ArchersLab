import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useState } from "react";

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
        <div className="m-5 flex gap-4 align-center justify-center">
            <div className="rounded-2xl pb-2 gray-67 flex flex-col items-center w-9/12">
                <div className="mx-7">
                    <div className="text-2xl mb-6 google font-bold mt-4">
                        Delete Account
                    </div>
                    WARNING! This deletes your account profile and data. Any reservations
                    done prior to deletion are cancelled when your account is deleted.
                </div>
                <div className="flex flex-col items-center justify-center gap-[10px]">
                    <form onSubmit={handleSubmit}> 
                        <table className="border-separate border-spacing-0">
                            <tbody>
                                <tr>
                                    <th align="left" className="py-3 font-bold">Password</th>
                                    <td className="w-[150px] py-3">
                                        <input name="password" onChange={handleChange} type="password" className="w-full rounded border border-gray-400 p-1 focus:outline-none focus:ring-2 focus:ring-[#006341]" />
                                    </td>
                                </tr>

                                <tr>
                                    <th align="left" className="py-3 font-bold">Confirm Password</th>
                                    <td className="w-[150px] py-3">
                                        <input name="confirmPassword" onChange={handleChange} type="password" className="bg-gray-89 confirm-password w-full rounded border border-gray-400 p-1 focus:outline-none focus:ring-2 focus:ring-[#006341]" />
                                    </td>
                                </tr>

                                <tr>
                                    <th colSpan="2" align="right" className="pt-4">
                                        <button type="submit" 
                                            className="mt-[3px] px-[6px] py-[3px] bg-[#C5C5C5] text-black
                                            rounded-md flex justify-center items-center
                                            active:scale-95 transition-transform transform hover:scale-103">Submit</button>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    )
}