import "server-only";
import { listUsers } from "./user.service";
import { requireRoles } from "@/shared/lib/access";
import { apiError } from "@/shared/lib/api-error";

export async function getUsers() {
  try {
    await requireRoles(["ADMIN"]);
    return Response.json(await listUsers());
  } catch (error: unknown) { return apiError(error); }
}
