import { makeAutoObservable, runInAction } from "mobx";
import bgm from '../assets/bgm.mp3';

class Music {
    audio= new Audio(bgm)
    
  constructor() {
    makeAutoObservable(this);
  }
  run () {
    this.audio.loop = true; // 设置音频循环播放
    this.audio.volume = 0.6
    this.audio.play(); // 播放音频
  }
  stop () {
    this.audio.pause();
  }
}

export default new Music();