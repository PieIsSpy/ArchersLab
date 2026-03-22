import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { FormInput, Button } from "../components/ui";
import { FormLayout } from "../components/layout";
import { deleteUser } from "../features/auth/services/userService.js";

export function DeleteAccount() {
  const { currentUser, setUser, setIsAuth, setAdmin } = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: "", confirmPassword: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    if (!window.confirm("Are you sure? This will delete all your reservations!")) return;
    if (form.password !== form.confirmPassword) { alert("Passwords do not match"); return; }
    try {
      const msg = await deleteUser(currentUser._id, form.password);
      setUser(null);
      setIsAuth(false);
      setAdmin(false);
      alert(msg.message);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <FormLayout title="Delete Account" subtitle="WARNING! This deletes your account and cancels all reservations. This action is permanent.">
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center space-y-4">
        <FormInput label="Password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Enter password" />
        <FormInput label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm password" />
        <Button type="submit" variant="danger">Delete Account</Button>
      </form>
    </FormLayout>
  );
}
