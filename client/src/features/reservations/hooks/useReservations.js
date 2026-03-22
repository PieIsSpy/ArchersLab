import { useState, useEffect, useCallback } from "react";
import { getReservations, createReservation, approveReservation, cancelReservation } from "../services/reservationService.js";

export function useReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getReservations();
      setReservations(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setReservations([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const create = async (data) => {
    await createReservation(data);
    await refetch();
  };

  const approve = async (id) => {
    await approveReservation(id);
    await refetch();
  };

  const cancel = async (id) => {
    await cancelReservation(id);
    await refetch();
  };

  return { reservations, loading, error, refetch, create, approve, cancel };
}
