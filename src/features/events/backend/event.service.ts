import "server-only";
import { prisma } from "@/shared/lib/prisma";
import { ApiError } from "@/shared/lib/api-error";
import type { CreateEventInput, UpdateEventInput } from "../event.schema";

const publicEvent = { id: true, name: true, startsAt: true, capacity: true, status: true } as const;

export function createEvent(input: CreateEventInput) {
  return prisma.event.create({
    data: { name: input.name, capacity: input.capacity, startsAt: new Date(input.startsAt) },
    select: publicEvent,
  });
}

export function listEvents() {
  return prisma.event.findMany({
    select: publicEvent,
    orderBy: [{ startsAt: "desc" }, { id: "asc" }],
    take: 50,
  });
}

export async function updateDraftEvent(id: string, input: UpdateEventInput) {
  return prisma.$transaction(async (tx) => {
    const changed = await tx.event.updateMany({
      where: { id, status: "DRAFT" },
      data: {
        ...(input.name !== undefined ? { name: input.name } : {}),
        ...(input.capacity !== undefined ? { capacity: input.capacity } : {}),
        ...(input.startsAt !== undefined ? { startsAt: new Date(input.startsAt) } : {}),
      },
    });
    if (changed.count !== 1) throw new ApiError(409, "Evento inexistente o fuera de edición");
    return tx.event.findUniqueOrThrow({ where: { id }, select: publicEvent });
  });
}
