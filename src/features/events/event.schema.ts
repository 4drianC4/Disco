import { z } from "zod";

export const createEventSchema = z.object({
  name: z.string().trim().min(3).max(100),
  startsAt: z.iso.datetime({ offset: true }),
  capacity: z.number().int().min(1).max(10000),
}).strict();
export type CreateEventInput = z.infer<typeof createEventSchema>;

export const updateEventSchema = createEventSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  { message: "Debes enviar al menos un campo" },
);
export type UpdateEventInput = z.infer<typeof updateEventSchema>;

export const eventIdSchema = z.uuid();

export const eventStatusSchema = z.enum(["DRAFT", "OPEN", "CLOSED"]);
export const eventDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  startsAt: z.string(),
  capacity: z.number(),
  status: eventStatusSchema,
});
export const eventListSchema = z.array(eventDtoSchema);
export type EventDto = z.infer<typeof eventDtoSchema>;
