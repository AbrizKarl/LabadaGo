/**
 * Shared display formatters. Lives here (not in an api/ file) because
 * formatting is a presentation concern — and lives in ONE place so
 * Dashboard and OrdersPage never drift apart on how a price looks.
 */

export function formatPeso(amount) {
  const value = Number(amount);
  if (!Number.isFinite(value)) return "\u20b1\u2014";
  return "\u20b1" + value.toLocaleString("en-PH");
}
