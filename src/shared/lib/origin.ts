import "server-only";
import { ApiError } from "./api-error";

export function requireSameOrigin(request: Request) {
  const expected = process.env.APP_ORIGIN;
  if (!expected || request.headers.get("origin") !== new URL(expected).origin)
    throw new ApiError(403, "Origen no permitido");
}
