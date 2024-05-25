import { makeAutoObservable, runInAction } from "mobx";
import bgm from '../assets/bgm.mp3';
import hit from '../assets/hit.mp3';
import boss from '../assets/boss.mp3';

class Music {
    audio= new Audio(bgm)
    bossAudio= new Audio(boss)
    hitAudio= new Audio(hit)
    
  constructor() {
    makeAutoObservable(this);
  }

  runHit() {
    this.hitAudio.currentTime = 0.14
    this.hitAudio.volume = 0.4
    this.hitAudio.play()
  }

  run () {
    this.audio.loop = true; // 设置音频循环播放
    this.audio.volume = 0.4
    this.audio.play(); // 播放音频
  }
  playBossBGM () {
    this.bossAudio.loop = true; // 设置音频循环播放
    this.bossAudio.volume = 0.4
    this.bossAudio.play(); // 播放音频
  }
  stopBossBGM() {
    this.bossAudio.pause();
  }
  stop () {
    this.audio.pause();
  }
}

export default new Music();