"use client";
import { useState } from "react";
import { AdmissionList } from "./admission-list";

// TODO: añadir AdmissionForm (React Hook Form + zodResolver(createAdmissionSchema)) y llamar onSaved.
export function AdmissionsPanel() {
  const [revision, setRevision] = useState(0);
  return (
    <section className="grid gap-6">
      <h1 className="text-2xl font-semibold">Admissions</h1>
      <button type="button" onClick={() => setRevision((r) => r + 1)}>Actualizar</button>
      <AdmissionList revision={revision} />
    </section>
  );
}
