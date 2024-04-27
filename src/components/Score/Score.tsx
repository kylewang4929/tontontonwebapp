import React from "react";
import { useContextState } from "../../context/StateProvider";

import "./Score.css";

const Score = () => {
  const [
    {
      playerName,
      gameState: { score },
    },
  ] = useContextState() as any;

  return (
    <div className="score">
      Score: {score}
    </div>
  );
};

export default Score;
