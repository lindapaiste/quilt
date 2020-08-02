import React, {useReducer} from "react";
import {CreationProps} from "./types";
import {generateInitialState} from "./generateGrid";
import SquareSvg from "../square/SVG";
import {Text, TouchableHighlight, View} from "react-native";
import {reducer} from "../state/reducer";
import {rotate} from "../state/actions";
import {isWin} from "../state/selectors";

const SQUARE_WIDTH = 100;

export const Grid = (props: CreationProps) => {
    const [state, dispatch] = useReducer(reducer, props, generateInitialState);

    return (
        <View>
            <View style={{
                position: "relative",
                width: props.width * SQUARE_WIDTH,
                height: props.height * SQUARE_WIDTH
            }}>
                {state.layout.map(({x, y}, id) => (
                    <TouchableHighlight key={id} onPress={() => dispatch(rotate(id))}>
                        <View key={id} style={{
                            position: "absolute",
                            left: x * SQUARE_WIDTH,
                            top: y * SQUARE_WIDTH,
                            transform: [{rotate: 90 * state.rotations[id] + "deg"}]
                        }}>
                            <SquareSvg key={id} colors={state.colors[id]} height={SQUARE_WIDTH} width={SQUARE_WIDTH}/>
                        </View>
                    </TouchableHighlight>
                ))}
            </View>
            {isWin(state) &&
            <Text style={{fontSize: 75}}>YOU WIN!</Text>}
        </View>
    )
}
