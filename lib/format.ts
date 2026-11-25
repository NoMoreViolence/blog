/** Ledger number, as the printer pads it: 6 → "006". */
export function ledgerNo(no: number) {
  return String(no).padStart(3, "0");
}

/** "2026-05-17" → "2026.05.17" */
export function ledgerDate(iso: string) {
  return iso.replaceAll("-", ".");
}

/** "2026-05-17" → "05.17" (the year is already printed at the head of the sheet) */
export function ledgerMonthDay(iso: string) {
  return ledgerDate(iso).slice(5);
}

/** 7224 → "7,224" */
export function ledgerCount(value: number) {
  return value.toLocaleString("en-US");
}
