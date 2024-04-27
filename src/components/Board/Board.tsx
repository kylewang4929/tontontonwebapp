import React, { useState } from "react";
import Hole from "../Hole/Hole";

import "./Board.css";

const Board = () => {
  return (
    <div className="board">
      <div className="board__top">
        <Hole moleId={0} />
        <Hole moleId={1} />
      </div>
      <div className="board__mid">
        <Hole moleId={2} />
        <Hole moleId={3} />
        <Hole moleId={4} />
      </div>
      <div className="board__bottom">
        <Hole moleId={5} />
        <Hole moleId={6} />
      </div>
    </div>
  );
};

export default Board;
