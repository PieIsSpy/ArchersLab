import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput, Button } from "../../components/ui";
import { FormLayout } from "../../components/layout";
import { createUser } from "../../features/auth/services/userService.js";

export function AdminRegistration() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", id: "", email: "", password: "", confirmPassword: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      alert("Please fill out missing fields");
      return;
    }
    if (form.password !== form.confirmPassword) { alert("Passwords do not match"); return; }

    try {
      await createUser({
        name: form.name, nickname: "", id: Number(form.id), bio: "", email: form.email,
        college: "", program: "", about: "", pfp_url: "", password: form.password, isAdmin: true,
      });
      alert("Successfully created account!");
      navigate(`/Profile/${form.id}`);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <FormLayout title="Admin Registration" subtitle="Create an account with administrator privileges.">
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center space-y-4">
        <FormInput label="Name" name="name" value={form.name} onChange={handleChange} placeholder="Enter full name" />
        <FormInput label="ID" name="id" value={form.id} onChange={handleChange} placeholder="Enter ID Number" />
        <FormInput label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter email" />
        <FormInput label="Password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Enter password" />
        <FormInput label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm password" />
        <Button type="submit">Create Admin Account</Button>
      </form>
    </FormLayout>
  );
}
