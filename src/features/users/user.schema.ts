import { z } from "zod";

export const userRoleSchema = z.enum(["ADMIN", "STAFF"]);

export const userDtoSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  email: z.email(),
  role: userRoleSchema,
});
export const userListSchema = z.array(userDtoSchema);
export type UserDto = z.infer<typeof userDtoSchema>;
