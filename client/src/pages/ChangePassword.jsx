import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { FormInput, Button } from "../components/ui";
import { FormLayout } from "../components/layout";
import { updateUser } from "../features/auth/services/userService.js";

export function ChangePassword() {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) { alert("Passwords do not match"); return; }
    try {
      await updateUser(currentUser._id, { oldPassword: form.oldPassword, password: form.newPassword });
      alert("Password Successfully Updated");
      navigate(`/Profile/${currentUser._id}`);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <FormLayout title="Change Password" subtitle="Need to secure your account? Change your password here.">
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center space-y-4">
        <FormInput label="Old Password" name="oldPassword" type="password" value={form.oldPassword} onChange={handleChange} placeholder="Enter old password" />
        <FormInput label="New Password" name="newPassword" type="password" value={form.newPassword} onChange={handleChange} placeholder="Enter new password" />
        <FormInput label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm new password" />
        <Button type="submit">Change Password</Button>
      </form>
    </FormLayout>
  );
}
