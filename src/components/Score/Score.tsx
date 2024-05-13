import React from "react";

import "./Score.css";
import gameState from "../../models/gameState";
import { observer } from "mobx-react-lite";

const Score = observer(() => {
  const score = gameState.gameState.score
  return (
    <div className="score">
      {score}
    </div>
  );
});

export default Score;
