import { describe, expect, it } from "vitest";
import { drinkDtoSchema } from "./drink.schema";

describe("drinkDtoSchema", () => {
  it("acepta una bebida válida", () => {
    expect(drinkDtoSchema.safeParse({ id: "00000000-0000-4000-8000-000000000002", name: "Agua", priceCents: 1000 }).success).toBe(true);
  });
  it("rechaza precio negativo", () => {
    expect(drinkDtoSchema.safeParse({ id: "00000000-0000-4000-8000-000000000002", name: "Agua", priceCents: -1 }).success).toBe(false);
  });
});
