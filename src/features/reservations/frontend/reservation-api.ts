import { fetchJson } from "@/shared/lib/api-client";
import { reservationListSchema } from "../reservation.schema";

export function fetchReservations(signal?: AbortSignal) {
  return fetchJson("/api/reservations", reservationListSchema, { signal });
}
