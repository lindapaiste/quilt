import {isFunction} from "lodash";
import chroma from "chroma-js";
export {isFunction, random, sample} from "lodash";

export const makeArray = <T>(length: number, value: T | ((i: number) => T)): T[] => {
    return [...new Array(length)].map((_, i) =>
        isFunction(value) ? value(i) : value
    );
};

export const randomHexes = (count: number): string[] => {
    return makeArray(count, () => chroma.random().hex());
}

export const replaceIndex = <T, AT extends T[]>(array: AT, i: number, value: T): AT => {
    return Object.assign([...array], { [i]: value }) as AT;
};
