export type Role = "ADMIN" | "STAFF";

export function canAccess(role: Role, allowed: readonly Role[]) {
  return allowed.includes(role);
}
