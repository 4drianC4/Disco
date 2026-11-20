import { describe, expect, it } from "vitest";
import { userDtoSchema } from "./user.schema";

describe("userDtoSchema", () => {
  it("acepta un usuario válido", () => {
    expect(userDtoSchema.safeParse({ id: "00000000-0000-4000-8000-000000000001", name: "Ana", email: "ana@example.test", role: "STAFF" }).success).toBe(true);
  });
  it("rechaza un rol inválido", () => {
    expect(userDtoSchema.safeParse({ id: "00000000-0000-4000-8000-000000000001", name: "Ana", email: "ana@example.test", role: "OWNER" }).success).toBe(false);
  });
});
