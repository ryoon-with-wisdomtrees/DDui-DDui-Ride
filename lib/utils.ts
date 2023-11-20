import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isEmptyObj(obj: any) {
  if (obj.constructor === Object && Object.keys(obj).length === 0) {
    return true;
  }

  return false;
}
