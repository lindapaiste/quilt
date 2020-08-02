export type GridColors = string[][];

export interface I_Size {
    width: number;
    height: number;
}

export interface CreationProps extends I_Size {
    colorCount: number;
    width: number; //# of squares
    height: number;
}
