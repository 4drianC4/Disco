import { z } from "zod";

export const admissionDtoSchema = z.object({
  id: z.uuid(),
  holderName: z.string(),
  eventId: z.uuid(),
  checkedInAt: z.string().nullable(),
});
export const admissionListSchema = z.array(admissionDtoSchema);
export type AdmissionDto = z.infer<typeof admissionDtoSchema>;
