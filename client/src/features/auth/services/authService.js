const BASE = "http://localhost:5001/api";

export async function initSession() {
  const res = await fetch(`${BASE}/auth/init`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) return { isAuth: false };
  return res.json();
}

export async function login(id, password) {
  const res = await fetch(`${BASE}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, password }),
    credentials: "include",
  });
  if (!res.ok) throw new Error("The user ID and password does not match");
  return res.json();
}

export async function logout() {
  const res = await fetch(`${BASE}/users/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Logout failed");
  return res.json();
}
