import "server-only";
import { createEventSchema, eventIdSchema, updateEventSchema } from "../event.schema";
import { createEvent, listEvents, updateDraftEvent } from "./event.service";
import { requireRoles } from "@/shared/lib/access";
import { requireSameOrigin } from "@/shared/lib/origin";
import { apiError } from "@/shared/lib/api-error";

type IdContext = { params: Promise<{ id: string }> };

export async function getEvents() {
  try {
    await requireRoles(["ADMIN", "STAFF"]);
    return Response.json(await listEvents());
  } catch (error: unknown) { return apiError(error); }
}

export async function postEvent(request: Request) {
  try {
    await requireRoles(["ADMIN"]);
    requireSameOrigin(request);
    const input = createEventSchema.parse(await request.json());
    return Response.json(await createEvent(input), { status: 201 });
  } catch (error: unknown) { return apiError(error); }
}

export async function patchEvent(request: Request, context: IdContext) {
  try {
    await requireRoles(["ADMIN"]);
    requireSameOrigin(request);
    const { id } = await context.params;
    const eventId = eventIdSchema.parse(id);
    const input = updateEventSchema.parse(await request.json());
    return Response.json(await updateDraftEvent(eventId, input));
  } catch (error: unknown) { return apiError(error); }
}
