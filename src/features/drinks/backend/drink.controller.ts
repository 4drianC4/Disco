import "server-only";
import { listDrinks } from "./drink.service";
import { requireRoles } from "@/shared/lib/access";
import { apiError } from "@/shared/lib/api-error";

export async function getDrinks() {
  try {
    await requireRoles(["ADMIN", "STAFF"]);
    return Response.json(await listDrinks());
  } catch (error: unknown) { return apiError(error); }
}
