import { z } from "zod";

export const barSaleDtoSchema = z.object({
  id: z.uuid(),
  totalCents: z.number().int().nonnegative(),
  createdAt: z.string(),
});
export const barSaleListSchema = z.array(barSaleDtoSchema);
export type BarSaleDto = z.infer<typeof barSaleDtoSchema>;
