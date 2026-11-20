"use client";
import { useEffect, useState } from "react";
import type { ReservationDto } from "../reservation.schema";
import { fetchReservations } from "./reservation-api";

export function ReservationList({ revision }: { revision: number }) {
  const [items, setItems] = useState<ReservationDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    fetchReservations(controller.signal)
      .then((data) => { if (!controller.signal.aborted) setItems(data); })
      .catch((err: unknown) => {
        if (!controller.signal.aborted) setError(err instanceof Error ? err.message : "Error de conexión");
      })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [revision]);

  if (loading) return <p role="status">Cargando…</p>;
  if (error) return <p role="alert">{error}</p>;
  if (items.length === 0) return <p>No hay registros.</p>;
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.guestName} · mesa {item.tableId.slice(0, 8)}</li>
      ))}
    </ul>
  );
}
