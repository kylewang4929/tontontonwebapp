import React from "react";

import "./Score.css";
import gameState from "../../models/gameState";
import { observer } from "mobx-react-lite";
import icon from './btb.png'

const Score = observer(() => {
  const score = gameState.userInfo?.point || '--'
  const remainingTimes = gameState.userInfo?.life || '--'
  return (
    <div className="score">
      <div className="score-title">
        <img src={icon}></img>
      {score}
      </div>
      <div className="score-tips">Life: {remainingTimes}</div>
    </div>
  );
});

export default Score;
