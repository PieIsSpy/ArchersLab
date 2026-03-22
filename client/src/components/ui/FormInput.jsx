const inputClass =
  "w-full px-[10px] py-[6px] rounded-xl gray-89 text-sm font-['Inter',sans-serif] box-border " +
  "focus:outline-none focus:ring-2 focus:ring-[#145b92] focus:border-[#145b92]";

export function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange = undefined,
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
  );
}
