import * as A from "./actionNames";

export type ActionTypes = {
    type: typeof A.ROTATE,
    payload: {id: number},
}

export const rotate = (id: number): ActionTypes => ({
    type: A.ROTATE,
    payload: {id},
})
