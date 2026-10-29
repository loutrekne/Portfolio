"use client";

import { useSyncExternalStore } from "react";

/** true si l'appareil a une souris / un trackpad (pas un écran tactile). */
export function usePointerFine() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(pointer: fine)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(pointer: fine)").matches,
    () => false,
  );
}
