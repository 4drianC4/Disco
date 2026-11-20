import "server-only";
import { prisma } from "@/shared/lib/prisma";

const publicReservation = { id: true, guestName: true, eventId: true, tableId: true } as const;

export function listReservations() {
  return prisma.reservation.findMany({ select: publicReservation, orderBy: [{ createdAt: "desc" }], take: 50 });
}
