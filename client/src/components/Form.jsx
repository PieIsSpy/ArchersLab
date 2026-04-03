import { EyeSvg, EyeSlashSvg } from "../components/Svg";
import { useState } from "react";

const inputClass =
	"w-full px-[10px] py-[6px] rounded-xl gray-89 text-sm font-['Inter',sans-serif] box-border " +
	"focus:outline-none focus:ring-2 focus:ring-[#145b92] focus:border-[#145b92]";

export function FormInput({
	label,
	name,
	type="text",
	value,
	onChange,
	placeholder = "",
	readOnly = false,
	maxLength = undefined,
}) {
	return (
			<div className="flex flex-col w-full">
			<label className="font-bold text-xs mb-1">{label}</label>
			<input
				type={type}
				name={name}
				value={value ?? ""}
				onChange={onChange}
				placeholder={placeholder}
				readOnly={readOnly}
				maxLength={maxLength}
				className={inputClass}
			/>
			</div>
	)
}

export function FormTextArea({
	label,
	name,
	value,
	type="text-area",
	onChange,
	placeholder = "",
	readOnly = false,
	maxLength = undefined,
}){
	return (<div className="flex flex-col w-full">
			<label className="font-bold text-xs mb-1">{label}</label>
			<textarea
				type={type}
				name={name}
				value={value ?? ""}
				onChange={onChange}
				placeholder={placeholder}
				readOnly={readOnly}
				maxLength={maxLength}
				className={inputClass}
			/>
			</div>
	);
}

export function FormPassword({
	label,
	name="password",
	type="password",
	value,
	onChange,
	placeholder = "",
	readOnly = false,
	maxLength = undefined,
}) {
	
  	const [open, setOpen] = useState(false);

	return (
			<div className="flex flex-col w-full">
			<label className="font-bold text-xs mb-1">{label}</label>
			<div className="flex flex-row w-full items-center gap-2">
				<input
					type={open ? "text" : "password"}
					name={name}
					value={value ?? ""}
					onChange={onChange}
					placeholder={placeholder}
					readOnly={readOnly}
					maxLength={maxLength}
					className={inputClass}
				/>
				<div
					onClick={() => setOpen(prev => !prev)}
				>
					{open ? <EyeSvg /> : <EyeSlashSvg />}
				</div>
			</div>
			</div>
	)
}


export function FormLayout({ title, subtitle = "", children, onSubmit=()=>{} }) {
	return (
		<div className="w-1/3 mx-auto my-45">
		<div className="mb-4">
			<div className="text-5xl google font-bold">{title}</div>
			{subtitle && <div className="google mt-2 text-gray-400">{subtitle}</div>}
		</div>
		<form 
			className="w-full flex flex-col items-center space-y-4 gray-67 rounded-2xl shadow-md p-4"
			onSubmit={onSubmit}
		>
			{children}
		</form>
		</div>
	);
} 