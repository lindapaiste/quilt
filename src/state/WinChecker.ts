import {State} from "./types";
import {I_Point, SideName} from "../square/types";
import {rotatedSide} from "../square/rotatedSide";

/**
 * making this a class because it makes internal referencing easier
 * rather than passing props around to a bunch of functions
 */

export class WinChecker {
    private state: State;
    public readonly hasError: boolean;

    /**
     * don't want to check more than is needed
     * stop upon error found
     */
    constructor(state: State) {
        this.state = state;
        this.hasError = false;
        if ( ! this.horizontalsMatch() ) {
            this.hasError = true;
            return;
        }
        if ( ! this.verticalsMatch() ) {
            this.hasError = true;
            return;
        }
    }

    private horizontalsMatch = (): boolean => {
        return this.state.layout.every(this.isRightMatch);
    }

    /**
     * callback to check each square with the one to its right
     * assumes that layout array goes in order across each row
     */
    private isRightMatch = (pos: I_Point, i: number, array: I_Point[]): boolean => {
        //true if at the end of the row
        const next = array[i+1];
        if ( next === undefined || next.y !== pos.y ) {
            return true;
        }
        //otherwise compare colors
        return this.rotatedSideColor(i, 'right') === this.rotatedSideColor(i+1, 'left');
    }

    private verticalsMatch = (): boolean => {
        return this.state.layout.every(this.isDownMatch);
    }

    /**
     * compare to the square below it using .find() to get the next
     * could get by index if I knew the number per row
     */
    private isDownMatch = (pos: I_Point, i: number, array: I_Point[]): boolean => {
        //true for bottom row
        const nextIndex = array.findIndex( obj => obj.x === pos.x && obj.y === pos.y + 1);
        if ( nextIndex === -1 ) {
            return true;
        }
        //otherwise compare colors
        return this.rotatedSideColor(i, 'bottom') === this.rotatedSideColor( nextIndex, 'top');
    }

    /**
     * need to look at the color which is CURRENTLY is the given position
     * after the number of rotations
     */
    private rotatedSideColor = (i: number, side: SideName): string => {
        const colors = this.state.colors[i];
        const rotations = this.state.rotations[i];
        return colors[rotatedSide(side, rotations)];
    }
}

export default WinChecker;
