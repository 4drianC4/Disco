import { describe, expect, it } from "vitest";
import { barSaleDtoSchema } from "./bar-sale.schema";

describe("barSaleDtoSchema", () => {
  it("acepta una venta válida", () => {
    expect(barSaleDtoSchema.safeParse({ id: "00000000-0000-4000-8000-000000000001", totalCents: 5000, createdAt: "2026-12-05T22:00:00.000Z" }).success).toBe(true);
  });
  it("rechaza total negativo", () => {
    expect(barSaleDtoSchema.safeParse({ id: "00000000-0000-4000-8000-000000000001", totalCents: -1, createdAt: "2026-12-05T22:00:00.000Z" }).success).toBe(false);
  });
});
