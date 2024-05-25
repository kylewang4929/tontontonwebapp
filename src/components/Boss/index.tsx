import React, { useEffect, useRef, useState } from "react";
import Hole, { HoleComponent } from "../Hole/Hole";
import blackIcon from '../../assets/black.png';
import blackIconK from '../../assets/black_k.png';
import './index.css'
import music from "../../models/music";
export default ({life = 100, time = 0, onClick}: any) => {
    const [icon,setIcon] =useState(blackIcon)
    const timerRef = useRef<any>(null)

    return (
        <div className="boss-modal">
            <div>
                {
                    new Array(100).fill(0).map((item, index) => {
                        if (index == 99) {
                            return (
                                <hr className="thunder"></hr>
                            )
                        }
                        return (
                            <hr style={{
                                left: Math.floor(Math.random() * window.innerWidth) + "px",
                                animationDuration: 0.2 + Math.random() * 0.3 + "s",
                                animationDelay: Math.random() * 5 + "s",
                            }}></hr>
                        )
                    })
                }
            </div>
            <Lift value={life}></Lift>
            <div className="limit-time">{time}</div>
            <div className="boss-wapper">
                <HoleComponent icon={icon} active onClick={() => {
                    onClick();
                    setIcon(blackIconK)
                    timerRef.current && clearTimeout(timerRef.current)
                    timerRef.current = setTimeout(() => {
                        setIcon(blackIcon)
                    }, 200)
                }}></HoleComponent>
            </div>
        </div>
    )
}

const Lift = ({value}: any) => {
    return (
        <div className="life-container">
            <div className="inner" style={{width: `${value}%`}}></div>
        </div>
    )
}