import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  geocodeByLatLng,
  geocodeByPlaceId,
} from "react-google-places-autocomplete";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isEmptyObj(obj: any) {
  if (obj.constructor === Object && Object.keys(obj).length === 0) {
    return true;
  }

  return false;
}

export const nowInKorea = async (obj: any) => {
  const geoInfo = await geocodeByLatLng(obj);
  if (geoInfo[0].formatted_address.includes("대한민국" || "South Korea")) {
    console.log("한국임");
    return true;
  } else return false;
};
