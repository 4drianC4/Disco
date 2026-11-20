import type { z } from "zod";

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
    public issues?: { path: (string | number)[]; message: string }[],
  ) { super(message); }
}

export async function fetchJson<T extends z.ZodType>(
  url: string,
  schema: T,
  init?: RequestInit,
): Promise<z.infer<T>> {
  const response = await fetch(url, {
    cache: "no-store",
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  const isJson = response.headers.get("content-type")?.includes("application/json");
  const body: unknown = isJson ? await response.json() : null;
  if (!response.ok) {
    const data = (body ?? {}) as { error?: string; issues?: HttpError["issues"] };
    throw new HttpError(response.status, data.error ?? `Error ${response.status}`, data.issues);
  }
  return schema.parse(body);
}
