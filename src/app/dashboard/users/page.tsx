import { requirePageRoles } from "@/shared/lib/access";
import { UsersPanel } from "@/features/users/frontend/users-panel";

export default async function UsersPage() {
  await requirePageRoles(["ADMIN"]);
  return <UsersPanel />;
}
