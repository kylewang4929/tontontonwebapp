import React, { useState, useEffect } from "react";
import { actionTypes } from "../../context/Reducer";

import { useContextState } from "../../context/StateProvider";

import "./Hole.css";
import gameState from "../../models/gameState";
import { observer } from "mobx-react-lite";

const Hole = observer(({ moleId }: any) => {
  const {moles} = gameState.gameState;
  const { start: gameStarted } = gameState;
 
  const handleMoleClicked = (moleId: any) => {
    if (!gameStarted) {
      return;
    }
    gameState.whackMole({moleId: moleId})
  };


  if (moles[moleId]) {
    const typeData = gameState.types[moles[moleId]]
    return (
      <div className="hole">
        <img onClick={() => handleMoleClicked(moleId)} className="hole__mole" src={typeData.icon}></img>
      </div>
    );
  }
  return <div className="hole"></div>;
});

export default Hole;
