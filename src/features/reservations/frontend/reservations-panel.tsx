"use client";
import { useState } from "react";
import { ReservationList } from "./reservation-list";

// TODO: añadir ReservationForm (React Hook Form + zodResolver(createReservationSchema)) y llamar onSaved.
export function ReservationsPanel() {
  const [revision, setRevision] = useState(0);
  return (
    <section className="grid gap-6">
      <h1 className="text-2xl font-semibold">Reservations</h1>
      <button type="button" onClick={() => setRevision((r) => r + 1)}>Actualizar</button>
      <ReservationList revision={revision} />
    </section>
  );
}
