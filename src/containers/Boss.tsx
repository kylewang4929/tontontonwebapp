import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import Boss from "../components/Boss";
import music from "../models/music";
import gameState from "../models/gameState";

export default observer(() => {
    const defaultLife = gameState.bossConfig.life
    const [life, setLife] = useState(defaultLife)
    const lifeRef = useRef(defaultLife)

    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => {
                clearTimeout(timer);
            };
        } else {
            if (lifeRef.current !== 0) {
                // 失败
                gameState.endGame();
            }
        }
    }, [timeLeft]);

    useEffect(() => {
        music.stop()
        music.playBossBGM()
        return () => {
            // 还原BGM
            music.stopBossBGM()
            music.run()
        }
    }, [])

    return (
        <Boss life={life} time={timeLeft} onClick={() => {
            music.runHit()
            gameState.runShake();
            gameState.vibrate();
            setLife((v) => {
                if (v > 0) {
                    const value = v - 1
                    lifeRef.current = value
                    if (value === 0) {
                        // 结束Boss
                        gameState.closeBoss()
                    }
                    return value
                }
                gameState.closeBoss()
                return 0
            })
        }}></Boss>
    )
})