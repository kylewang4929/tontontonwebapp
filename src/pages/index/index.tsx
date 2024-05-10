import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { TonConnectButton, useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { useTonConnect } from "../../hooks/useTonConnect";
import ButtonCom from '../../components/Button';
import { useNavigate } from "react-router-dom";
import './index.css'
import Game from "../game";
import { observer } from "mobx-react-lite";
import gameState from "../../models/gameState";
import { Address } from "ton-core";
import { bindAccount, unBindAccount } from "../../services/api";
import { useInitDataRaw } from "@tma.js/sdk-react";
import mall from "../../models/mall";
import Mall from "../../containers/Mall";
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
  mall.products;
  const [tonConnectUI] = useTonConnectUI();
  const { wallet } = useTonConnect();
  const userFriendlyAddress = useTonAddress();
  const addressRef = useRef('')
  // const twaInitData = useInitDataRaw();
  // console.log('twaInitData', twaInitData)

  useEffect(() => {
    addressRef.current = userFriendlyAddress;
  }, [userFriendlyAddress])

  useEffect(() => {
    const unsubscribe = tonConnectUI.onStatusChange(
        async (walletAndwalletInfo) => {
          console.log('walletAndwalletInfo', walletAndwalletInfo)
          if (walletAndwalletInfo) {
            const newAddress = Address.parse(walletAndwalletInfo?.account.address).toString();
            const {publicKey, walletStateInit, chain} = walletAndwalletInfo?.account;
            console.log('walletAndwalletInfo', newAddress)
            const bindRes = await bindAccount({
              address: newAddress,
              network: chain,
              publicKey,
              walletStateInit,
            })
            console.log('bindRes', bindRes)
          } else {
            // 断开，解绑
            const unBindRes = await unBindAccount({address: addressRef.current})
            console.log('bindRes', unBindRes)
          }
        } 
    );
    return () => {
      unsubscribe();
    }
  }, [])
  
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