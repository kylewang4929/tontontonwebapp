import React, { useEffect } from "react";
import axios from "axios";

import Board from "../../components/Board/Board";
import Score from "../../components/Score/Score";
import Timer from "../../components/Timer/Timer";
import { actionTypes } from "../../context/Reducer";
import { useContextState } from "../../context/StateProvider";

import "./game.css";
import Button from "../../components/Button";

const Game = () => {
  const [
    {
      playerName,
      gameState: { gameStarted, gameOver, moles, score },
    },
    dispatch,
  ] = useContextState() as any;

  useEffect(() => {
    const activeMoles = moles.filter((mole: any) => mole).length;
    if (!gameOver && activeMoles < 2 && gameStarted) {
      const randomMole = Math.floor(Math.random() * Math.floor(6) + 1);

      const newMole = setTimeout(() => {
        dispatch({
          type: actionTypes.ADD_RANDOM_MOLE,
          payload: {
            moleId: randomMole,
          },
        });
      }, 500);

      return () => {
        clearTimeout(newMole);
      };
    }
  }, [moles, dispatch, gameStarted]);

  // if (!playerName) {
  //   return <Lobby />;
  // }

  const handleResetGame = () => {
    dispatch({
      type: actionTypes.RESET_GAME,
      payload: {},
    });
  };

  const handleStartGame = () => {
    dispatch({
      type: actionTypes.START_GAME,
      payload: {},
    });
  };

  const handleSubmitScore = async () => {
    const response = await axios.post(`http://localhost:3001/submit-score`, {
      playerName,
      score,
    });

    if (response.status !== 200) {
      return;
    }

    if (response.data) {
      dispatch({
        type: actionTypes.SUBMITTED_SCORE,
        payload: {},
      });
    }
  };

  return (
    <div className="game">
      <Score />
      {gameStarted && <Timer />}
      {gameOver && <div className="game__over">Game Over!</div>}
      {!gameOver && <Board />}
      {gameOver && (
        <button className="game__submit" onClick={handleSubmitScore}>
          Submit Score
        </button>
      )}
      <div className="button-box">
        <Button onClick={handleStartGame}>Start</Button>
        <Button onClick={handleResetGame}>Reset</Button>
      </div>
    </div>
  );
};

export default Game;
