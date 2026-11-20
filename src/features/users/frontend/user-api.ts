import { fetchJson } from "@/shared/lib/api-client";
import { userListSchema } from "../user.schema";

export function fetchUsers(signal?: AbortSignal) {
  return fetchJson("/api/users", userListSchema, { signal });
}
