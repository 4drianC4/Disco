"use client";
import { useState } from "react";
import { BarSaleList } from "./bar-sale-list";

// TODO: añadir BarSaleForm (React Hook Form + zodResolver(createBarSaleSchema)) y llamar onSaved.
export function BarSalesPanel() {
  const [revision, setRevision] = useState(0);
  return (
    <section className="grid gap-6">
      <h1 className="text-2xl font-semibold">BarSales</h1>
      <button type="button" onClick={() => setRevision((r) => r + 1)}>Actualizar</button>
      <BarSaleList revision={revision} />
    </section>
  );
}
