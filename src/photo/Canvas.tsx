import React, {useRef, useEffect, useMemo} from "react";
import {I_Rectangle, DrawImageProps, MakeGridProps, I_TopLeft, I_Size} from "./types";
import img from "./DP243354.jpg";
import { GLView } from 'expo';
import Expo2DContext from 'expo-2d-context';

//const src = "/public/images/DP243354.jpg";

export const myProps: MakeGridProps = {
    src: img,
    width: 5,
    height: 5,
    squareSize: 50,
    sourceSelection: {
        x: 50,
        y: 50,
        width: 700,
        height: 700
    },
    sourceSize: {
        width: 2876,
        height: 3877
    }
};

export const ImageSquare = ({image, sourceArea, destinationArea}: DrawImageProps) => {
    /*const ref = useRef<HTMLCanvasElement>(null);

    console.log(ref);

    const ctx = useMemo( () => ref.current?.getContext("2d"), [ref] );
*/
    const onContextCreate = (gl) => {
        const ctx = new Expo2DContext(gl)
    }

    const doDraw = (ctx) => {
        if (ctx !== undefined && ctx !== null) {
            ctx.drawImage(
                image,
                sourceArea.x,
                sourceArea.y,
                sourceArea.width,
                sourceArea.height,
                destinationArea.x,
                destinationArea.y,
                destinationArea.width,
                destinationArea.height
            );
            ctx.flush();
            //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            console.log("did drawImage")
        }
    }
/*
    useEffect(() => {
       if (ctx !== undefined && ctx !== null) {
                ctx.drawImage(
                    image,
                    sourceArea.x,
                    sourceArea.y,
                    sourceArea.width,
                    sourceArea.height,
                    destinationArea.x,
                    destinationArea.y,
                    destinationArea.width,
                    destinationArea.height
                );
                //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
           console.log("did drawImage")
        }
    }, [ctx, sourceArea, destinationArea, image]);
    */

    return (
        <GLView
            width={destinationArea.width}
            height={destinationArea.height}
            onContextCreate={gl => doDraw(new Expo2DContext(gl))}
        />
    );
};

export class ImageGrid {
    public image: CanvasImageSource;

    private sourceSelection: I_Rectangle;

    private readonly sSize: I_Size;

    private readonly dSize: I_Size;

    //just store it all
    private props: MakeGridProps;

    constructor(props: MakeGridProps) {
        this.props = props;
        const {
            src,
            sourceSize,
            sourceSelection,
            squareSize,
            width,
            height
        } = props;
        /**
         * create and store html image element from the src
         * does passed width need to be passed, or can I use image.naturalWidth?
         */
        this.image = document.createElement("img");
        this.image.src = src;
        this.image.width = sourceSize.width;
        this.image.height = sourceSize.height;

        console.log(this.image);
        /**
         * calculate square sizes for destination and source
         */
        this.sSize = {
            width: sourceSelection.width / width,
            height: sourceSelection.height / height
        };
        this.dSize = {
            width: squareSize,
            height: squareSize
        };

        /**
         * save the x and y of the source selection
         */
        this.sourceSelection = sourceSelection;
    }

    getImageProps = (x: number, y: number): DrawImageProps => {
        return {
            image: this.image,
            sourceArea: {
                ...this.sSize,
                x: this.sourceSelection.x + x * this.sSize.width,
                y: this.sourceSelection.y + y * this.sSize.height
            },
            destinationArea: {
                ...this.dSize,
                x: 0,
                y: 0
            }
        };
    };

    getAllSquares = (): Array<I_TopLeft & DrawImageProps> => {
        const squares: Array<I_TopLeft & DrawImageProps> = [];
        for (let x = 0; x < this.props.width; x++) {
            for (let y = 0; y < this.props.height; y++) {
                squares.push({
                    left: x * this.dSize.width,
                    top: y * this.dSize.height,
                    ...this.getImageProps(x, y)
                });
            }
        }
        return squares;
    };
}

export const Grid = (props: MakeGridProps) => {
    const gridClass = new ImageGrid(props);

    return (
        <>
            <div style={{ position: "relative" }}>
                {gridClass.getAllSquares().map(({ top, left, ...props }, i) => (
                    <div key={i} style={{ position: "absolute", top, left }} className="tile">
                        <ImageSquare {...props} />
                    </div>
                ))}
            </div>
        </>
    );
};
