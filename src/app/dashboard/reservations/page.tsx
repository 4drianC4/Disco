import { requirePageRoles } from "@/shared/lib/access";
import { ReservationsPanel } from "@/features/reservations/frontend/reservations-panel";

export default async function ReservationsPage() {
  await requirePageRoles(["ADMIN", "STAFF"]);
  return <ReservationsPanel />;
}
