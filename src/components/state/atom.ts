import { atom } from "recoil";
import { Ticker } from "./type";

export const tickersState = atom<Ticker[]>({
    key: 'tickersState',
    default: [],
});

export const currentTickerState = atom<Ticker | null>({
    key: 'currentTickerState',
    default: null,
});