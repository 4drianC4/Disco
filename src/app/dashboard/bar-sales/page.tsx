import { requirePageRoles } from "@/shared/lib/access";
import { BarSalesPanel } from "@/features/bar-sales/frontend/bar-sales-panel";

export default async function BarSalesPage() {
  await requirePageRoles(["ADMIN", "STAFF"]);
  return <BarSalesPanel />;
}
