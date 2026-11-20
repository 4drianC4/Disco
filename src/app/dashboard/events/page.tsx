import { requirePageRoles } from "@/shared/lib/access";
import { EventsPanel } from "@/features/events/frontend/events-panel";

export default async function EventsPage() {
  const user = await requirePageRoles(["ADMIN", "STAFF"]);
  return <EventsPanel canManage={user.role === "ADMIN"} />;
}
