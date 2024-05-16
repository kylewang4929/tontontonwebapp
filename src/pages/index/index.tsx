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
import ToolBar from "../../containers/ToolBar";
import Score from "../../components/Score/Score";
import Leaderboard from "../../containers/Leaderboard";
const StyledApp = styled.div`
  background-color: #C4DB86;
  color: black;

  height: 100vh;
`;

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

export default observer(() => {
  mall.products;
  const [tonConnectUI] = useTonConnectUI();
  const { wallet } = useTonConnect();
  const rawAddress = useTonAddress(false);
  const addressRef = useRef('')
  // const twaInitData = useInitDataRaw();
  // console.log('twaInitData', twaInitData)

  useEffect(() => {
    if (addressRef.current !== rawAddress) {
      addressRef.current = rawAddress;
      // 保存一份
      const newAddressa = Address.parse(rawAddress).toString();
      console.log('userFriendlyAddress', rawAddress, newAddressa)
      gameState.tonAddress = newAddressa
      gameState.getConfig();
      gameState.queryUserInfo();
      mall.query()
    }

  }, [rawAddress])

  useEffect(() => {
    const unsubscribe = tonConnectUI.onStatusChange(
      async (walletAndwalletInfo) => {
        if (walletAndwalletInfo) {

          if (localStorage.getItem('isBindAccount') === 'true') return;
          const newAddress = Address.parse(walletAndwalletInfo?.account.address).toString();
          const { publicKey, walletStateInit, chain } = walletAndwalletInfo?.account;
          const bindRes = await bindAccount({
            address: newAddress,
            network: chain,
            publicKey,
            walletStateInit,
          })
          if (bindRes.status === 200) {
            console.log('bindRes', bindRes)
            localStorage.setItem('isBindAccount', "true")
          }
        } else {
          // 断开，解绑
          const unBindRes = await unBindAccount({ address: addressRef.current })
          console.log('bindRes', unBindRes)
          localStorage.removeItem('isBindAccount')
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
      <div className="app-container">

        {/* {
                !!wallet && <div className="wallet-menu"><TonConnectButton /></div>
              } */}
        <Score />
        <Game disabled={!gameState.start}></Game>

        <div className="tool-bar-wapper">
          <div className="connect-button-wapper">
            {
              !gameState.start && (
                <>
                  {
                    !wallet ? <TonConnectButton /> : (
                      <div>
                        <ButtonCom onClick={() => {
                          gameState.startGame()
                        }}>
                          Start Game
                        </ButtonCom>
                        <Leaderboard></Leaderboard>
                      </div>
                    )
                  }
                </>
              )
            }

          </div>
          {gameState.start && <ToolBar></ToolBar>}
        </div>
      </div>
    </StyledApp>
  )
})