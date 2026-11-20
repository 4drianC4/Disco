"use client";
import { useState } from "react";
import { UserList } from "./user-list";

export function UsersPanel() {
  const [revision, setRevision] = useState(0);
  return (
    <section className="grid gap-6">
      <h1 className="text-2xl font-semibold">Usuarios</h1>
      <button type="button" onClick={() => setRevision((r) => r + 1)}>Actualizar</button>
      <UserList revision={revision} />
    </section>
  );
}
