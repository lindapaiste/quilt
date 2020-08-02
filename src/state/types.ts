import {I_Point, SideColors} from "../square/types";

/**
 * if wanting to mix different size squares, then a flat array with absolute positioning works better than nested arrays
 */

export interface State {
    //holds the relation from (x,y) to id
    //can store a 2d array of numbers, or a 1d array with x and y for .find()
    //x and y are multiples of a constant square width
    layout: I_Point[];
    //colors for each id
    colors: SideColors[];
    //rotation for each id, in multiples of 90
    rotations: number[];
}

/*
export interface State {
    squares: SideColors[][];
    rotations: number[][];
}*/
