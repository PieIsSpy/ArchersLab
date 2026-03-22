const BASE = "http://localhost:5001/api/rooms";

export async function getRooms() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Failed to fetch rooms");
  return res.json();
}
