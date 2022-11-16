import { atom } from "recoil";

export type RoundSpec = {
  targetMovieId: number;
};

export type GameSpec = {
  rounds: RoundSpec[];
};
