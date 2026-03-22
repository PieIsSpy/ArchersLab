import { useState } from "react";
import { FormInput, Button } from "../components/ui";
import { FormLayout } from "../components/layout";
import { login } from "../features/auth/services/authService.js";

export function UserLogin({ setIsAuth, setAdmin, setUser }) {
  const [form, setForm] = useState({ id: "", password: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "id" && (!/^\d*$/.test(value) || value.length > 8)) return;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await login(Number(form.id), form.password);
      alert(`Welcome ${data.name}!`);
      setIsAuth(true);
      setAdmin(data.isAdmin);
      setUser(data);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <FormLayout title="User Login">
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center space-y-4">
        <FormInput label="ID" name="id" value={form.id} onChange={handleChange} placeholder="Enter ID" />
        <FormInput label="Password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Enter Password" />
        <Button type="submit">Login</Button>
      </form>
    </FormLayout>
  );
}
