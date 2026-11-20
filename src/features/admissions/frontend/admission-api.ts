import { fetchJson } from "@/shared/lib/api-client";
import { admissionListSchema } from "../admission.schema";

export function fetchAdmissions(signal?: AbortSignal) {
  return fetchJson("/api/admissions", admissionListSchema, { signal });
}
