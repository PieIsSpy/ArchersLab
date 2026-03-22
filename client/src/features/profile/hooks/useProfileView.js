import { useState, useEffect } from "react";
import { getUser } from "../../auth/services/userService.js";

export function useProfileView(id) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getUser(id)
      .then(setUser)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { user, setUser, loading, error };
}
