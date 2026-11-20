import Link from "next/link";
import { requirePageRoles } from "@/shared/lib/access";

export const instant = false;

export default async function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  await requirePageRoles(["ADMIN", "STAFF"]);
  return (
    <>
      <nav aria-label="Principal" className="flex gap-4 p-4">
        <Link href="/dashboard/events">Eventos</Link>
        <Link href="/dashboard/admissions">Entradas</Link>
        <Link href="/dashboard/drinks">Bebidas</Link>
        <Link href="/dashboard/bar-sales">Ventas</Link>
        <Link href="/dashboard/reservations">Reservas</Link>
        <Link href="/dashboard/users">Usuarios</Link>
      </nav>
      <main className="p-4">{children}</main>
    </>
  );
}
