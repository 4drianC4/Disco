"use client";
import { useEffect, useState } from "react";
import type { DrinkDto } from "../drink.schema";
import { fetchDrinks } from "./drink-api";

export function DrinkList({ revision }: { revision: number }) {
  const [items, setItems] = useState<DrinkDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    fetchDrinks(controller.signal)
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
        <li key={item.id}>{item.name} · {(item.priceCents / 100).toFixed(2)} Bs</li>
      ))}
    </ul>
  );
}
