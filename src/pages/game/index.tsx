import React from "react";
import styled from "styled-components";
import Game from "./Game";
import { StateProvider } from "../../context/StateProvider";
import reducer, { initialState } from "../../context/Reducer";

const StyledApp = styled.div`
  background-color: #e8e8e8;
  color: black;

  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  }
  min-height: 100vh;
`;

const AppContainer = styled.div`
  height: 100vh;
  margin: 0 auto;
`;


export default () => {
    return (
        <StyledApp>
            <AppContainer>
              <StateProvider initialState={initialState} reducer={reducer}>
                <Game></Game>
              </StateProvider>
            </AppContainer>
        </StyledApp>
    )
}