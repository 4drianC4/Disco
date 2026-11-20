"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HttpError } from "@/shared/lib/api-client";
import { localDateTimeToIso } from "@/shared/lib/dates";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { createEventSchema, type CreateEventInput } from "../event.schema";
import { submitEvent } from "./event-api";

const fields = ["name", "startsAt", "capacity"] as const;

export function EventForm({ onSaved }: { onSaved: () => void }) {
  const [message, setMessage] = useState("");
  const { register, handleSubmit, reset, setError, formState: { errors, isSubmitting } } =
    useForm<CreateEventInput>({ resolver: zodResolver(createEventSchema) });

  const submit = handleSubmit(async (input) => {
    setMessage("");
    try {
      await submitEvent(input);
      reset();
      setMessage("Evento guardado");
      onSaved();
    } catch (error: unknown) {
      if (error instanceof HttpError) {
        for (const issue of error.issues ?? []) {
          const field = fields.find((f) => f === issue.path[0]);
          if (field) setError(field, { message: issue.message });
        }
        setMessage(error.status === 401 ? "Tu sesión expiró, vuelve a iniciar sesión." : error.message);
      } else {
        setMessage("No se pudo conectar con el servidor");
      }
    }
  });

  return (
    <form onSubmit={submit} noValidate className="grid max-w-md gap-3">
      <Label htmlFor="event-name">Nombre</Label>
      <Input id="event-name" {...register("name")} aria-invalid={!!errors.name} aria-describedby="event-name-error" />
      <p id="event-name-error" className="text-sm">{errors.name?.message}</p>

      <Label htmlFor="event-date">Fecha y hora</Label>
      <Input id="event-date" type="datetime-local"
        {...register("startsAt", { setValueAs: (v: string) => localDateTimeToIso(v) ?? "" })}
        aria-invalid={!!errors.startsAt} aria-describedby="event-date-error" />
      <p id="event-date-error" className="text-sm">{errors.startsAt?.message}</p>

      <Label htmlFor="event-capacity">Capacidad</Label>
      <Input id="event-capacity" type="number"
        {...register("capacity", { valueAsNumber: true })}
        aria-invalid={!!errors.capacity} aria-describedby="event-capacity-error" />
      <p id="event-capacity-error" className="text-sm">{errors.capacity?.message}</p>

      <Button disabled={isSubmitting} type="submit">{isSubmitting ? "Guardando…" : "Guardar"}</Button>
      <p role="status">{message}</p>
    </form>
  );
}
