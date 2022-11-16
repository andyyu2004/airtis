import { atom } from "recoil";

export const roundState = atom({
  key: "roundState", // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});

export const scoreState = atom({
  key: "scoreState", // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});
