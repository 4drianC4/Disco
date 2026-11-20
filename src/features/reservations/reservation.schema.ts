import { z } from "zod";

export const reservationDtoSchema = z.object({
  id: z.uuid(),
  guestName: z.string().trim().min(1),
  eventId: z.uuid(),
  tableId: z.uuid(),
});
export const reservationListSchema = z.array(reservationDtoSchema);
export type ReservationDto = z.infer<typeof reservationDtoSchema>;
