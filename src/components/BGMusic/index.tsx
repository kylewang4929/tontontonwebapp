import React, { useState, useEffect, useRef } from 'react';
import bgm from '../../assets/bgm.mp3';
import musicIcon from './music.png';
import './index.css'
const BGMusic = () => {
    const [audio] = useState(new Audio(bgm));
    const [isPlay, seIsPlay] = useState(false)
    const isFirst = useRef(true)

    const run = () => {
        isFirst.current = false
        audio.loop = true; // 设置音频循环播放
        audio.volume = 0.6
        audio.play(); // 播放音频
        seIsPlay(true)
    }
    const stop = () => {
        seIsPlay(false)
        audio.pause(); // 组件卸载时停止音频播放
    }
    useEffect(() => {
        document.addEventListener('click', () => {
            if (isFirst.current) {
                run();
            }
        })
        return () => {
            stop()
        };
    }, []); // 空数组表示只在组件挂载时执行

    return (
        <div onClick={(e) => {
            e.stopPropagation();
            e.preventDefault()
            const value = !isPlay
            seIsPlay(value)
            if (value) {
                run();
            } else {
                stop()
            }
        }} className={`round-button ${isPlay ? 'play-animate': ''}`} style={{ display: 'flex',justifyContent:'center',alignItems: 'center'}}>
            <img src={musicIcon} style={{width: 40, height: 40}}></img>
        </div>
    );
};

export default BGMusic;
