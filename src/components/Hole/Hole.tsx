import React, { useState, useEffect } from "react";

import "./Hole.css";
import gameState from "../../models/gameState";
import { observer } from "mobx-react-lite";
import tukeng from '../../assets/tukeng.png';
import chuizi from './chuizi.png';
const Hole = observer(({ moleId }: any) => {
  const {moles, moleStatus} = gameState.gameState;
  const { start: gameStarted } = gameState;
 
  const handleMoleClicked = (moleId: any) => {
    if (!gameStarted) {
      return;
    }
    gameState.whackMole({moleId: moleId})
  };
  const id = moles[moleId] || 0
  const status = moleStatus[moleId] || 0
  const active = !!moles[moleId]
  const typeData = gameState.types[id]
  const [typeState, setTypeState] = useState(typeData)

  useEffect(() => {
    if (moles[moleId] !== 0) {
      setTypeState(gameState.types[moles[moleId]])
    }
  }, [moles[moleId]])
  
  const icon = status === 1 ? typeState.kIcon: typeState.icon
  return <div className="hole">
      {
        status === 1 && (
          <img src={chuizi} className="hole__chuizi"></img>
        )
      }
      <img src={tukeng} className="hole__mask"></img>
      <div className="hole__mole__wapper">
        <img onClick={() => handleMoleClicked(moleId)} className={`hole__mole ${active ? 'active': 'un-active'}`} src={icon}></img>
      </div>
  </div>;
});

export default Hole;
