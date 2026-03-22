import { useState, useEffect } from "react";
import { getRooms } from "../services/roomService.js";

export function useRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getRooms()
      .then((data) => {
        const sorted = [...data].sort((a, b) => a._id.localeCompare(b._id));
        setRooms(sorted);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { rooms, loading, error };
}
