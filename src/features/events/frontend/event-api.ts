import { fetchJson } from "@/shared/lib/api-client";
import { eventDtoSchema, eventListSchema, type CreateEventInput } from "../event.schema";

export function fetchEvents(signal?: AbortSignal) {
  return fetchJson("/api/events", eventListSchema, { signal });
}

export function submitEvent(input: CreateEventInput) {
  return fetchJson("/api/events", eventDtoSchema, { method: "POST", body: JSON.stringify(input) });
}
