import {CreationProps, GridColors, I_Size} from "./types";
import {makeArray, randomHexes, sample} from "../lib";
import {SideColors} from "../square/types";
import {State} from "../state/types";
import {random} from "../lib";
/**
 *  for a grid which is x squares wide and y squares tall,
 *  need 2y alternating rows of x or x+1 colors because of the outside triangles
 *  could just do all to x+1 and ignore the extras rather than switching
 */
export const generateGrid = ({colorCount, width, height}: CreationProps): GridColors => {
    const colors = randomHexes(colorCount);
    const makeRow = (i: number) => {
        const length = i % 2 ? width + 1 : width;
        return makeArray(length, () => sample(colors) as string);
    }
    return makeArray(2 * height + 1, makeRow);
}

/**
 * could infer height and width from the grid, but easier to just pass in
 */
export const gridToSquares = ({grid, width, height}: { grid: GridColors } & I_Size): SideColors[][] => {
    const getSides = (x: number, y: number): SideColors => ({
        top: grid[2 * y][x],
        left: grid[2 * y + 1][x],
        right: grid[2 * y + 1][x + 1],
        bottom: grid[2 * y + 2][x],
    });
    const getRow = (y: number) => makeArray(width, x => getSides(x, y));
    return makeArray(height, getRow);
}

export const generateSquares = (props: CreationProps): SideColors[][] => {
    const grid = generateGrid(props);
    console.log( grid );
    return gridToSquares({...props, grid});
}

export const generateInitialState = (props: CreationProps): State => {
    const state: State = {
        layout: [],
        rotations: [],
        colors: [],
    }
    generateSquares(props).forEach( (arr, y) => arr.forEach(( obj, x) => {
        state.layout.push({x,y});
        state.rotations.push(random(1,3));
        state.colors.push(obj);
    }) );
    return state;
}
