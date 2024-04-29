import React, { useState } from "react";
import styled from "styled-components";

import { TonConnectButton } from "@tonconnect/ui-react";
import { useTonConnect } from "../../hooks/useTonConnect";
import ButtonCom from '../../components/Button';
import { useNavigate } from "react-router-dom";
import './index.css'
import Game from "../game";
import { observer } from "mobx-react-lite";
import gameState from "../../models/gameState";
const StyledApp = styled.div`
  background-color: #e8e8e8;
  color: black;

  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  }
  min-height: 100vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;


export default observer(() => {
  const { wallet } = useTonConnect();
  const navigate = useNavigate();
  return (
      <StyledApp className="page">
          <AppContainer>
              <div className="connect-button-wapper">
                {
                  !gameState.start && (
                    <>
                      {
                          !wallet ? <TonConnectButton /> : <ButtonCom onClick={() => {
                            gameState.startGame()
                          }}>Start Game</ButtonCom>
                      }
                    </>
                  )
                }
              
              </div>
              {
                !!wallet && <div className="wallet-menu"><TonConnectButton /></div>
              }

              {
                gameState.start && (
                  <Game></Game>
                )
              }
          </AppContainer>
      </StyledApp>
  )
})