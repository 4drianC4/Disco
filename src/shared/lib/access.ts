import "server-only";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/shared/lib/prisma";
import { ApiError } from "./api-error";
import { canAccess, type Role } from "./permissions";

export async function requireRoles(allowed: readonly Role[]) {
  const session = await auth();
  if (!session?.user.id) throw new ApiError(401, "Inicia sesión");
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, role: true, active: true },
  });
  if (!user || !user.active) throw new ApiError(401, "Sesión no válida");
  if (!canAccess(user.role, allowed)) throw new ApiError(403, "Sin permiso");
  return user;
}

export async function requirePageRoles(allowed: readonly Role[]) {
  try {
    return await requireRoles(allowed);
  } catch (error: unknown) {
    if (error instanceof ApiError && error.status === 401) redirect("/login");
    throw error;
  }
}
