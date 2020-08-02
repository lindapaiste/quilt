import {State} from "./types";
import {ActionTypes} from "./actions";
import * as A from "./actionNames";
import {replaceIndex} from "../lib";

export const reducer = (state: State, action: ActionTypes) => {
    switch (action.type) {
        case A.ROTATE:
            const {id} = action.payload;
            return {
                ...state,
                rotations: replaceIndex(state.rotations, id, state.rotations[id] + 1)
            }
        default:
            return state;
    }
}
