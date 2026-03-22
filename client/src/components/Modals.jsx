import { useState, useEffect } from "react";
import { FormInput, Button } from "./ui";

export function Modal({ open, onClose, children }) {
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape" && open) onClose(); };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="ml-24 fixed inset-0 bg-[#000000cc] flex flex-col items-center justify-center" onClick={onClose}>
      <div className="gray-89 p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
        {children}
        <Button onClick={onClose} className="mt-2">Close</Button>
      </div>
    </div>
  );
}

export function InpersonModal({ open, onClose, onConfirm }) {
  const emptyForm = { first_name: "", last_name: "", email: "", id_number: "" };
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape" && open) handleClose(); };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleClose = () => { setForm(emptyForm); onClose(); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.first_name || !form.last_name || !form.email || !form.id_number) {
      alert("Please fill out missing fields"); return;
    }
    if (form.id_number.length !== 8) { alert("Invalid ID number length!"); return; }
    if (/[a-zA-Z]/.test(form.id_number)) { alert("ID number must only contain numbers"); return; }

    onConfirm({ name: `${form.first_name} ${form.last_name}`, email: form.email, _id: form.id_number });
    handleClose();
  };

  return (
    <div className="ml-24 fixed inset-0 bg-[#000000cc] flex flex-col items-center justify-center" onClick={onClose}>
      <h2 className="google font-bold text-3xl mb-4">Reserve Seat</h2>
      <div className="modal gray-67 w-1/3 rounded-xl p-4" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <FormInput label="First Name" name="first_name" value={form.first_name} onChange={handleChange} placeholder="Enter first name" />
          <FormInput label="Last Name" name="last_name" value={form.last_name} onChange={handleChange} placeholder="Enter last name" />
          <FormInput label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter email" />
          <FormInput label="ID Number" name="id_number" value={form.id_number} onChange={handleChange} placeholder="Enter ID number" />
          <div className="flex justify-center mt-4">
            <Button type="submit">Reserve</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
