import "server-only";
import { prisma } from "@/shared/lib/prisma";

const publicUser = { id: true, name: true, email: true, role: true } as const;

export function listUsers() {
  return prisma.user.findMany({ select: publicUser, orderBy: [{ name: "asc" }], take: 50 });
}
