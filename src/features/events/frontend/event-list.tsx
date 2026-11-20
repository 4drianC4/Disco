"use client";
import { useEffect, useState } from "react";
import { formatEventDate } from "@/shared/lib/dates";
import type { EventDto } from "../event.schema";
import { fetchEvents } from "./event-api";

export function EventList({ revision }: { revision: number }) {
  const [events, setEvents] = useState<EventDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    fetchEvents(controller.signal)
      .then((data) => { if (!controller.signal.aborted) setEvents(data); })
      .catch((err: unknown) => {
        if (!controller.signal.aborted) setError(err instanceof Error ? err.message : "Error de conexión");
      })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [revision]);

  if (loading) return <p role="status">Cargando…</p>;
  if (error) return <p role="alert">{error}</p>;
  if (events.length === 0) return <p>No hay eventos.</p>;
  return (
    <ul className="grid gap-2">
      {events.map((event) => (
        <li key={event.id}>
          {event.name} · {formatEventDate(event.startsAt)} · {event.capacity} plazas · <span>{event.status}</span>
        </li>
      ))}
    </ul>
  );
}
