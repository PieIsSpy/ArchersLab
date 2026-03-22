const base =
  "px-[15px] py-[5px] bg-[#145b92] p-3 rounded-xl transition-all " +
  "hover:scale-102 active:scale-100 active:shadow-inner select-none text-white";

const variants = {
  primary: base,
  danger: base.replace("bg-[#145b92]", "bg-[#7f0202]"),
  ghost: "border px-[15px] py-[5px] p-3 rounded-xl transition-all hover:scale-102 active:scale-100 select-none",
};

export function Button({ children, type = "button", variant = "primary", onClick = undefined, className = "" }) {
  return (
    <button
      type={/** @type {"button"|"submit"|"reset"} */ (type)}
      onClick={onClick}
      className={`${variants[variant] ?? variants.primary} ${className}`}
    >
      {children}
    </button>
  );
}
