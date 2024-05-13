import React, { useEffect } from "react";

import Board from "../../components/Board/Board";
import Score from "../../components/Score/Score";
import Timer from "../../components/Timer/Timer";

import "./game.css";
import { observer } from "mobx-react-lite";
import gameState from "../../models/gameState";
import { autorun } from "mobx";
import Button from "../../components/Button";
import ToolBar from "../../containers/ToolBar";

const Game = observer(({disabled = false}: any) => {
  const {
    start: gameStarted,
    gameState: { gameOver, moles, score },
  } = gameState;
  
  

  const handleResetGame = () => {
    gameState.resetGame();
  };


  return (
    <div className="game" style={{pointerEvents: disabled? 'none': 'auto'}}>
      {/* {gameStarted && <Timer />} */}
      {gameOver && <div className="game__over">Game Over!</div>}
      {!gameOver && <Board />}
      {gameOver && <Button onClick={handleResetGame}>Back</Button>}
    </div>
  );
})

export default Game;
