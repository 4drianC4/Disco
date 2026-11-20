import { describe, expect, it } from "vitest";
import { createEventSchema } from "./event.schema";

const valid = { name: "Noche Disco", startsAt: "2026-12-05T22:00:00-04:00", capacity: 100 };

describe("createEventSchema", () => {
  it("acepta un evento válido", () => {
    expect(createEventSchema.safeParse(valid).success).toBe(true);
  });
  it("rechaza capacidad cero", () => {
    expect(createEventSchema.safeParse({ ...valid, capacity: 0 }).success).toBe(false);
  });
  it("rechaza campos extra como status", () => {
    expect(createEventSchema.safeParse({ ...valid, status: "OPEN" }).success).toBe(false);
  });
});
