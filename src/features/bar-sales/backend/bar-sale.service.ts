import "server-only";
import { prisma } from "@/shared/lib/prisma";

const publicBarSale = { id: true, totalCents: true, createdAt: true } as const;

export function listBarSales() {
  return prisma.barSale.findMany({ select: publicBarSale, orderBy: [{ createdAt: "desc" }], take: 50 });
}
