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
  default: { lat: null, lng: null },
});

// export const source
export interface destinationInterface {
  destination: {};
}
export const destinationState = atom({
  key: "destination",
  default: {},
});
