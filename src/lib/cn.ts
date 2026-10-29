import { clsx, type ClassValue } from "clsx";

/** Concatène des classes conditionnelles. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
