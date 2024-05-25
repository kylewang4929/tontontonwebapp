import React, { useState, useEffect } from "react";

import "./Hole.css";
import gameState from "../../models/gameState";
import { observer } from "mobx-react-lite";
import tukeng from '../../assets/tukeng.png';
import hole_image from '../../assets/hole.png';
import hole_wapper from '../../assets/hole_wapper.png';
import chuizi from './chuizi.png';
import music from "../../models/music";
import sleep from "../../utils/sleep";
const Hole = observer(({ moleId }: any) => {
  const {moles, moleStatus} = gameState.gameState;
  const { start: gameStarted } = gameState;
 
  const handleMoleClicked = async (moleId: any) => {
    if (!gameStarted) {
      return;
    }
    await sleep(100)
    gameState.whackMole({moleId: moleId})
  };
  const id = moles[moleId] || 0
  const status = moleStatus[moleId] || 0
  const active = !!moles[moleId]
  const typeData = gameState.types[id]
  const [typeState, setTypeState] = useState(typeData)

  useEffect(() => {
    if (moles[moleId] !== 0) {
      setTypeState(gameState.types[moles[moleId]])
    }
  }, [moles[moleId]])
  
  const icon = status === 1 ? typeState.kIcon: typeState.icon
  return <HoleComponent active={active} icon={icon} onClick={() => {
    music.runHit()
    handleMoleClicked(moleId)
  }}></HoleComponent>
  // return <div className="hole">
  //     {/* {
  //       status === 1 && (
  //         <img src={chuizi} className="hole__chuizi"></img>
  //       )
  //     } */}
  //     <img src={hole_wapper} className="hole__mask__wapper"></img>
  //     <div className="hole__mole__wapper">
  //       <img onClick={() => {
  //         music.runHit()
  //         handleMoleClicked(moleId)
  //       }} className={`hole__mole ${active ? 'active': 'un-active'}`} src={icon}></img>
  //     </div>
  //     <img src={hole_image} className="hole__mask"></img>
  // </div>;
});

const HoleComponent = ({onClick, active, icon}: any) => {
  return (
    <div className="hole">
      <img src={hole_wapper} className="hole__mask__wapper"></img>
      <div className="hole__mole__wapper">
        <img onClick={() => {
          onClick()
        }} className={`hole__mole ${active ? 'active': 'un-active'}`} src={icon}></img>
      </div>
      <img src={hole_image} className="hole__mask"></img>
  </div>
  )
}
export {HoleComponent}
export default Hole;
