import "server-only";
import { prisma } from "@/shared/lib/prisma";

const publicAdmission = { id: true, holderName: true, eventId: true, checkedInAt: true } as const;

export function listAdmissions() {
  return prisma.admission.findMany({ select: publicAdmission, orderBy: [{ createdAt: "desc" }], take: 50 });
}
