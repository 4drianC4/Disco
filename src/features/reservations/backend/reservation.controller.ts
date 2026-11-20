import "server-only";
import { listReservations } from "./reservation.service";
import { requireRoles } from "@/shared/lib/access";
import { apiError } from "@/shared/lib/api-error";

export async function getReservations() {
  try {
    await requireRoles(["ADMIN", "STAFF"]);
    return Response.json(await listReservations());
  } catch (error: unknown) { return apiError(error); }
}
