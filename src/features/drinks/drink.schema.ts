import { z } from "zod";

export const drinkDtoSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  priceCents: z.number().int().nonnegative(),
});
export const drinkListSchema = z.array(drinkDtoSchema);
export type DrinkDto = z.infer<typeof drinkDtoSchema>;
