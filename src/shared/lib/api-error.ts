import { ZodError } from "zod";
import { Prisma } from "@/generated/prisma/client";

export class ApiError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

export function apiError(error: unknown): Response {
  if (error instanceof ApiError)
    return Response.json({ error: error.message }, { status: error.status });
  if (error instanceof ZodError)
    return Response.json({ error: "Datos inválidos", issues: error.issues }, { status: 400 });
  if (error instanceof SyntaxError)
    return Response.json({ error: "JSON inválido" }, { status: 400 });
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") return Response.json({ error: "El registro ya existe" }, { status: 409 });
    if (error.code === "P2025") return Response.json({ error: "Registro no encontrado" }, { status: 404 });
    if (error.code === "P2003") return Response.json({ error: "Relación inválida o registro en uso" }, { status: 409 });
  }
  console.error("Fallo interno de la operación");
  return Response.json({ error: "Error interno" }, { status: 500 });
}
