import { fetchJson } from "@/shared/lib/api-client";
import { barSaleListSchema } from "../bar-sale.schema";

export function fetchBarSales(signal?: AbortSignal) {
  return fetchJson("/api/bar-sales", barSaleListSchema, { signal });
}
