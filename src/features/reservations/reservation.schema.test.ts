import { describe, expect, it } from "vitest";
import { reservationDtoSchema } from "./reservation.schema";

describe("reservationDtoSchema", () => {
  it("acepta una reserva válida", () => {
    expect(reservationDtoSchema.safeParse({ id: "00000000-0000-4000-8000-000000000001", guestName: "Ana", eventId: "00000000-0000-4000-8000-000000000001", tableId: "00000000-0000-4000-8000-000000000001" }).success).toBe(true);
  });
  it("rechaza guestName vacío", () => {
    expect(reservationDtoSchema.safeParse({ id: "00000000-0000-4000-8000-000000000001", guestName: "", eventId: "00000000-0000-4000-8000-000000000001", tableId: "00000000-0000-4000-8000-000000000001" }).success).toBe(false);
  });
});
