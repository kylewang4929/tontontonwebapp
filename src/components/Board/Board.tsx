import React, { useState } from "react";
import Hole from "../Hole/Hole";

import "./Board.css";

const Board = () => {
  return (
    <div className="board">
      <div className="board__top">
        <Hole moleId={0} />
        <Hole moleId={1} />
        <Hole moleId={2} />
      </div>
      <div className="board__mid">
        <Hole moleId={3} />
        <Hole moleId={4} />
        <Hole moleId={5} />
      </div>
      <div className="board__bottom">
        <Hole moleId={6} />
        <Hole moleId={7} />
        <Hole moleId={8} />
      </div>
    </div>
  );
};

export default Board;
