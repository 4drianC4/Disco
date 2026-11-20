"use client";
import { useState } from "react";
import { EventForm } from "./event-form";
import { EventList } from "./event-list";

export function EventsPanel({ canManage }: { canManage: boolean }) {
  const [revision, setRevision] = useState(0);
  return (
    <section className="grid gap-6">
      <h1 className="text-2xl font-semibold">Eventos</h1>
      {canManage && <EventForm onSaved={() => setRevision((r) => r + 1)} />}
      <EventList revision={revision} />
    </section>
  );
}
