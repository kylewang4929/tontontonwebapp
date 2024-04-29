import React, { useState, useEffect } from "react";
import { actionTypes } from "../../context/Reducer";
import { useContextState } from "../../context/StateProvider";
import gameState from "../../models/gameState";

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => {
        clearTimeout(timer);
      };
    } else {
      gameState.endGame();
    }
  }, [timeLeft]);

  return <div className="timer">Time Left: {timeLeft}</div>;
};

export default Timer;
