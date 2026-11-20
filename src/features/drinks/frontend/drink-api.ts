import { fetchJson } from "@/shared/lib/api-client";
import { drinkListSchema } from "../drink.schema";

export function fetchDrinks(signal?: AbortSignal) {
  return fetchJson("/api/drinks", drinkListSchema, { signal });
}
