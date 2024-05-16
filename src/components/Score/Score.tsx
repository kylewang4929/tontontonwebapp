import React from "react";

import "./Score.css";
import gameState from "../../models/gameState";
import { observer } from "mobx-react-lite";

const Score = observer(() => {
  const score = gameState.gameState.score
  const remainingTimes = gameState.userInfo?.life
  return (
    <div className="score">
      {score}
      <div className="score-tips">Remaining times: {remainingTimes}</div>
    </div>
  );
});

export default Score;
