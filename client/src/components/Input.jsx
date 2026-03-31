import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/dark-datepicker.css";

export function Button(
	{
		type="button",
		className="flex justify-center p-2 bg-[#145b92] rounded-xl select-none",
		onClick={},
		label
	}
){
	return (
		<button 
			type={type}
			className={className}
			onClick={onClick}>
			{label}
		</button>
	)
}

export function CancelButton(
	{
		type="button",
		className="ml-auto flex items-center gap-2 text-red-500",
		onClick={},
		label="Cancel"
	}
){
	return (
		<button
			type={type}
			className={className}
			onClick={onClick}
		>
		{label}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="20px"
			width="20px"
			viewBox="0 -960 960 960"
			className="flex-shrink-0"
		>
			<path
			d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z"
			fill="currentColor"
			/>
		</svg>
		</button>
	)
}

export function DarkDatePicker({
	selected,
	onChange,
	minDate,
	maxDate,
	placeholderText=""
})
{
return 	(<div className="gap-2 flex flex-row">
			<div className="text-xl google flex items-center justify-center">
				Date:
			</div>
			<div className="text-xl w-[175px] flex items-center justify-center">
				<DatePicker
					className="gray-89 text-xl w-full p-3 rounded-xl text-center
					focus:outline-none focus:ring-2 focus:ring-[#145b92]
					focus:border-[#145b92] selection:bg-blue-300 selection:text-black"
					
					selected={selected}
					onChange={onChange}
					minDate={minDate}
					maxDate={maxDate}
					placeholderText={placeholderText}
					dateFormat="MM/dd/yyyy"
				/>
			</div>
		</div>);
}

export function Picker ({
	label,
	value,
	onChange,
	children,
	className
})
{
	return <label className="text-xl gap-3 flex flex-row justify-center items-center">
				<div>{label}</div>
				
				<select
					className = {"text-xl bg-[#2e2e31] text-center "+className}
					style={{
						width: "175px",
						height: "50px",
						borderRadius: "8px",
						padding: "6px 10px",
					}}
					value={value}
					onChange={onChange}
					>
					{children}
				</select>
			</label>
}