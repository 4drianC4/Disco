import "server-only";
import { listBarSales } from "./bar-sale.service";
import { requireRoles } from "@/shared/lib/access";
import { apiError } from "@/shared/lib/api-error";

export async function getBarSales() {
  try {
    await requireRoles(["ADMIN", "STAFF"]);
    return Response.json(await listBarSales());
  } catch (error: unknown) { return apiError(error); }
}
