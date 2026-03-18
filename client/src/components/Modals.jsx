import { useState, useEffect } from "react";

export function InpersonModal({open, onClose, onConfirm}) {
	
	const [form, setForm] = useState({
		first_name: "",
		last_name: "",
		email: "",
		id_number: "",
	});

	const inputClass =
		"w-full mb-2 px-[10px] py-[6px] rounded-xl gray-89 text-sm font-['Inter',sans-serif] box-border " +
		"focus:outline-none focus:ring-2 focus:ring-[#145b92] focus:border-[#145b92]";

	useEffect(() => {
		const handleEsc = (e) => {
			if (e.key === "Escape") onClose();
		};

		document.addEventListener("keydown", handleEsc);
		return () => document.removeEventListener("keydown", handleEsc);
	}, [onClose]);

	if (!open) return null;

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!form.first_name || !form.last_name || !form.email || !form.id_number) {
			alert('Please fill out missing fields')
			return
		}

		const inpersonInfo = {
			name: form.first_name + " " + form.last_name,
			email: form.email,
			_id: form.id_number
		}

		onConfirm(inpersonInfo);
		onClose();
	};

	return (
		<div className="ml-24 fixed inset-0 bg-[#000000cc] flex flex-col items-center justify-center" onClick={onClose}>
			<h2 className="google font-bold text-3xl mb-4">Reserve Seat</h2>
			<div className="modal gray-67 w-1/3 rounded-xl p-4" onClick={(e) => e.stopPropagation()}>
				<form onSubmit={handleSubmit}>
					<div className="flex flex-col w-full">
						<label className="font-bold text-xs mb-1">First Name</label>
						<input
						type="text"
						name="first_name"
						value={form.first_name}
						onChange={handleChange}
						className={inputClass}
						placeholder="Enter first name"
						/>
					</div>

					<div className="flex flex-col w-full">
						<label className="font-bold text-xs mb-1">Last Name</label>
						<input
						type="text"
						name="last_name"
						value={form.last_name}
						onChange={handleChange}
						className={inputClass}
						placeholder="Enter last name"
						/>
					</div>

					<div className="flex flex-col w-full">
						<label className="font-bold text-xs mb-1">Email</label>
						<input
						type="email"
						name="email"
						value={form.email}
						onChange={handleChange}
						className={inputClass}
						placeholder="Enter email"
						/>
					</div>

					<div className="flex flex-col w-full">
						<label className="font-bold text-xs mb-1">ID Number</label>
						<input
						type="text"
						name="id_number"
						value={form.id_number}
						onChange={handleChange}
						className={inputClass}
						placeholder="Enter ID number"
						/>
					</div>

					<div className="flex justify-center mt-4">
						<button
						type="submit"
						className="px-[15px] py-[5px] bg-[#145b92] p-3 rounded-xl transition-all hover:scale-102 active:scale-100 active:shadow-inner select-none text-white"
						>
						Reserve
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}