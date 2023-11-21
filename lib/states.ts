import { atom } from "recoil";

// ( useRecoilState : react의 useState랑 동일한 기능이라고 생각하면 된다.

//   useSetRecoilState : useState에서 setter만 있는것

//   useRecolValue : useState에서 value만 있는것

//   useResetRecoilState : 기본값으로 초기화 시키는 기능)

export interface sourceInterface {
  source: {};
}
export const sourceState = atom({
  key: "source",
  default: { lat: 0, lng: 0, name: "", label: "" },
});

// export const source
export interface destinationInterface {
  destination: {};
}
export const destinationState = atom({
  key: "destination",
  default: { lat: 0, lng: 0, name: "", label: "" },
});

export const setDirectionRoutePointsState = atom({
  key: "directionRoutePoints",
  default: <any>{},
});

export const centerStates = atom({
  key: "center",
  default: {
    lat: 49.28488100000001,
    lng: -123.122643,
  },
});
