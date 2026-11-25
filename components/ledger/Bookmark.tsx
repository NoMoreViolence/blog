"use client";

import { useEffect, useSyncExternalStore } from "react";

const STORAGE_KEY = "nmv:ledger-printed-through";

/*
 * What was printed through on the reader's previous visit. Read once per page
 * load and frozen, so writing today's value below does not erase the marker
 * mid-visit; a new session sees the new boundary.
 */
let printedThrough: string | null | undefined;

function readPrintedThrough(): string | null {
  if (printedThrough === undefined) {
    try {
      printedThrough = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      printedThrough = null;
    }
  }
  return printedThrough;
}

const subscribe = () => () => {};

/**
 * The newest entry date the reader had seen before this visit, or null on a
 * first visit (and during server render). Records `newestIso` as seen.
 */
export function usePrintedThrough(newestIso: string | undefined) {
  const previous = useSyncExternalStore(
    subscribe,
    readPrintedThrough,
    () => null,
  );

  useEffect(() => {
    if (!newestIso) {
      return;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, newestIso);
    } catch {
      // Private mode or blocked storage: the ledger simply never shows a boundary.
    }
  }, [newestIso]);

  return previous;
}

/** The 통장정리 line: everything above it was already printed last time. */
export default function Bookmark() {
  return (
    <div
      role="note"
      className="pointer-events-none absolute inset-x-0 -top-2.5 z-10 flex items-center gap-3 animate-print motion-reduce:animate-print-fade"
    >
      <span aria-hidden="true" className="h-px flex-1 bg-seal" />
      <span className="bg-sheet px-1 font-ledger text-xs text-seal">
        여기까지 정리됨
      </span>
      <span aria-hidden="true" className="h-px flex-1 bg-seal" />
    </div>
  );
}
