import { requirePageRoles } from "@/shared/lib/access";
import { DrinksPanel } from "@/features/drinks/frontend/drinks-panel";

export default async function DrinksPage() {
  await requirePageRoles(["ADMIN", "STAFF"]);
  return <DrinksPanel />;
}
