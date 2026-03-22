const BASE = "http://localhost:5001/api/reservations";

export async function getReservations() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Failed to fetch reservations");
  return res.json();
}

export async function createReservation(data) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Reservation failed");
  }
  return res.json();
}

export async function updateReservation(id, data) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Update failed");
  }
  return res.json();
}

export const approveReservation = (id) =>
  updateReservation(id, { resStatus: "Upcoming" });

export const cancelReservation = (id) =>
  updateReservation(id, { resStatus: "Cancelled" });
