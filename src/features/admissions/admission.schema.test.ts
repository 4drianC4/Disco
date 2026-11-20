import { describe, expect, it } from "vitest";
import { admissionDtoSchema } from "./admission.schema";

describe("admissionDtoSchema", () => {
  it("acepta una entrada válida", () => {
    expect(admissionDtoSchema.safeParse({ id: "00000000-0000-4000-8000-000000000001", holderName: "Ana", eventId: "00000000-0000-4000-8000-000000000001", checkedInAt: null }).success).toBe(true);
  });
  it("rechaza eventId inválido", () => {
    expect(admissionDtoSchema.safeParse({ id: "00000000-0000-4000-8000-000000000001", holderName: "Ana", eventId: "x", checkedInAt: null }).success).toBe(false);
  });
});
