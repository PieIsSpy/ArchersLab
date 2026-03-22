/**
 * FormLayout — consistent wrapper for all auth/form pages.
 * Usage:
 *   <FormLayout title="User Login" subtitle="...">
 *     <form>...</form>
 *   </FormLayout>
 */
export function FormLayout({ title, subtitle = "", children }) {
  return (
    <div className="w-1/3 mx-auto my-45">
      <div className="mb-4">
        <div className="text-5xl google font-bold">{title}</div>
        {subtitle && <div className="google mt-2 text-gray-400">{subtitle}</div>}
      </div>
      <div className="w-full flex flex-col items-center space-y-4 gray-67 rounded-2xl shadow-md p-4">
        {children}
      </div>
    </div>
  );
}
