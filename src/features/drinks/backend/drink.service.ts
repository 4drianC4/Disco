import "server-only";
import { prisma } from "@/shared/lib/prisma";

const publicDrink = { id: true, name: true, priceCents: true } as const;

export function listDrinks() {
  return prisma.drink.findMany({ select: publicDrink, orderBy: [{ name: "asc" }], take: 50 });
}
