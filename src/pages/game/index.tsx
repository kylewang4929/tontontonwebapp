import React from "react";
import styled from "styled-components";
import Game from "./Game";
import { StateProvider } from "../../context/StateProvider";
import reducer, { initialState } from "../../context/Reducer";

export default () => {
    return (
      <StateProvider initialState={initialState} reducer={reducer}>
        <Game></Game>
      </StateProvider>
    )
}