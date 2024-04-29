import React, { useEffect } from "react";

import Board from "../../components/Board/Board";
import Score from "../../components/Score/Score";
import Timer from "../../components/Timer/Timer";

import "./game.css";
import { observer } from "mobx-react-lite";
import gameState from "../../models/gameState";
import { autorun } from "mobx";
import Button from "../../components/Button";

const Game = observer(() => {
  const {
    start: gameStarted,
    gameState: { gameOver, moles, score },
  } = gameState;
  
  useEffect(() => {
    const activeMoles = moles.filter((mole: any) => mole).length;
    if (!gameOver && activeMoles < gameState.maxActive && gameStarted) {
      const randomMole = Math.floor(Math.random() * Math.floor(8) + 1);

      const newMole = setTimeout(() => {
        gameState.addRandomMole({moleId: randomMole});
      }, gameState.speed);

      return () => {
        clearTimeout(newMole);
      };
    }
  }, [moles, gameStarted]);

  const handleResetGame = () => {
    gameState.resetGame();
  };


  return (
    <div className="game">
      <Score />
      {gameStarted && <Timer />}
      {gameOver && <div className="game__over">Game Over!</div>}
      {!gameOver && <Board />}
      {gameOver && <Button onClick={handleResetGame}>Reset</Button>}
      
      <div className="button-box"></div>
    </div>
  );
})

export default Game;
