import { requirePageRoles } from "@/shared/lib/access";
import { AdmissionsPanel } from "@/features/admissions/frontend/admissions-panel";

export default async function AdmissionsPage() {
  await requirePageRoles(["ADMIN", "STAFF"]);
  return <AdmissionsPanel />;
}
