import React, { useState, useEffect } from "react";

import "./Hole.css";
import gameState from "../../models/gameState";
import { observer } from "mobx-react-lite";
import tukeng from '../../assets/tukeng.png';
const Hole = observer(({ moleId }: any) => {
  const {moles} = gameState.gameState;
  const { start: gameStarted } = gameState;
 
  const handleMoleClicked = (moleId: any) => {
    if (!gameStarted) {
      return;
    }
    gameState.whackMole({moleId: moleId})
  };
  const id = moles[moleId] || 0
  const active = !!moles[moleId]
  const typeData = gameState.types[id]
  const [typeState, setTypeState] = useState(typeData)

  useEffect(() => {
    if (moles[moleId] !== 0) {
      setTypeState(gameState.types[moles[moleId]])
    }
  }, [moles[moleId]])
  

  return <div className="hole">
      <img src={tukeng} className="hole__mask"></img>
      <div className="hole__mole__wapper">
        <img onClick={() => handleMoleClicked(moleId)} className={`hole__mole ${active ? 'active': ''}`} src={typeState.icon}></img>
      </div>
  </div>;
});

export default Hole;
