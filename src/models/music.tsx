import { makeAutoObservable, runInAction } from "mobx";
import bgm from '../assets/bgm.mp3';
import hit from '../assets/hit.mp3';

class Music {
    audio= new Audio(bgm)
    
  constructor() {
    makeAutoObservable(this);
  }

  runHit() {
    const hitAudio= new Audio(hit)
    hitAudio.volume = 0.6
    hitAudio.play()
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