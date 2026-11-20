export function localDateTimeToIso(value: string): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

export function formatEventDate(iso: string) {
  return new Intl.DateTimeFormat("es-BO", {
    dateStyle: "medium", timeStyle: "short", timeZone: "America/La_Paz",
  }).format(new Date(iso));
}
