import React, { useState, useEffect } from "react";
import { actionTypes } from "../../context/Reducer";
import { useContextState } from "../../context/StateProvider";

const Timer = () => {
  const [state, dispatch] = useContextState() as any;
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => {
        clearTimeout(timer);
      };
    } else {
      dispatch({
        type: actionTypes.END_GAME,
        payload: {},
      });
    }
  }, [timeLeft, dispatch]);

  return <div className="timer">Time Left: {timeLeft}</div>;
};

export default Timer;
