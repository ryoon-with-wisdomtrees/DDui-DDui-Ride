import { atom } from "recoil";

export interface sourceInterface {
  source: {};
}
export const sourceState = atom({
  key: "source",
  default: {},
});

// export const source
export interface destinationInterface {
  destination: {};
}
export const destinationState = atom({
  key: "destination",
  default: {},
});
