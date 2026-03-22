export function MainLayout({ header, children, fullWidth = false }) {
  return (
    <div className={`${fullWidth ? "w-full" : "w-3/4"} mx-auto py-6 flex flex-col gap-4`}>
      {header && <div>{header}</div>}
      {children}
    </div>
  );
}
