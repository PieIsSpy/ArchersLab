const FIELDS = [
  { label: "FULL NAME", key: "name" },
  { label: "ID", key: "_id" },
  { label: "EMAIL", key: "email" },
  { label: "COLLEGE", key: "college" },
  { label: "PROGRAM", key: "program" },
  { label: "ABOUT", key: "about" },
];

export function UserProfile({ user }) {
  return (
    <div className="space-y-3">
      {FIELDS.map((field) => (
        <div key={field.key}>
          <h2 className="font-bold text-xs ml-3 mb-1">{field.label}</h2>
          <div className="rounded-xl gray-89 p-3">
            <h1 className="text-l">{user[field.key] ?? "N/A"}</h1>
          </div>
        </div>
      ))}
    </div>
  );
}
