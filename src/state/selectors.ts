import {State} from "./types";
import {SideColors} from "../square/types";
import WinChecker from "./WinChecker";

export const getSquareId = (x: number, y: number) => (state: State): number => {
    return state.layout.findIndex(point => point.x === x && point.y === y);
}

export const getSquareColors = (id: number) => (state: State): SideColors => {
    return state.colors[id];
}

export const getSquareRotation = (id: number) => (state: State): number => {
    return state.rotations[id];
}

export const isWin = (state: State): boolean => {
    const checker = new WinChecker(state);
    return ! checker.hasError;
}
