"use client";
import { useState } from "react";
import { DrinkList } from "./drink-list";

// TODO: añadir DrinkForm (React Hook Form + zodResolver(createDrinkSchema)) y llamar onSaved.
export function DrinksPanel() {
  const [revision, setRevision] = useState(0);
  return (
    <section className="grid gap-6">
      <h1 className="text-2xl font-semibold">Drinks</h1>
      <button type="button" onClick={() => setRevision((r) => r + 1)}>Actualizar</button>
      <DrinkList revision={revision} />
    </section>
  );
}
