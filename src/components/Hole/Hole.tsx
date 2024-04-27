import React, { useState, useEffect } from "react";
import { actionTypes } from "../../context/Reducer";

import { useContextState } from "../../context/StateProvider";

import "./Hole.css";

const Hole = ({ moleId }: any) => {
  const [mole, setMole] = useState(false);
  const [
    {
      gameState: { moles, gameStarted },
    },
    dispatch,
  ] = useContextState() as any;

  const handleMoleClicked = (moleId: any) => {
    if (!gameStarted) {
      return;
    }
    dispatch({
      type: actionTypes.WHACK_MOLE,
      payload: {
        moleId: moleId,
      },
    });
  };

  useEffect(() => {
    if (!moles) {
      return;
    }
    const moleState = moles[moleId];
    setMole(moleState);
  }, [moles, moleId]);

  if (mole) {
    return (
      <div className="hole">
        <div
          className="hole__mole"
          onClick={() => handleMoleClicked(moleId)}
        ></div>
      </div>
    );
  }
  return <div className="hole"></div>;
};

export default Hole;
