import "server-only";
import { listAdmissions } from "./admission.service";
import { requireRoles } from "@/shared/lib/access";
import { apiError } from "@/shared/lib/api-error";

export async function getAdmissions() {
  try {
    await requireRoles(["ADMIN", "STAFF"]);
    return Response.json(await listAdmissions());
  } catch (error: unknown) { return apiError(error); }
}
