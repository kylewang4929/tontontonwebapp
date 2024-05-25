import { makeAutoObservable, runInAction } from "mobx";
import { default as moleIcon, default as moleIconK } from '../assets/mole.png';

import greenMole from '../assets/green.png';
import greenMoleK from '../assets/green_k.png';

import yIcon from '../assets/y.png';
import yIconK from '../assets/y_k.png';

import pIcon from '../assets/p.png';
import pIconK from '../assets/p_k.png';

import blackIcon from '../assets/black.png';
import blackIconK from '../assets/black_k.png';

import blueIcon from '../assets/blue.png';
import blueIconK from '../assets/blue_k.png';

import { postEvent } from '@tma.js/sdk';


import { IGameTarget, endGame, getGameConfig, getUserProfile, submitGameData } from "../services/api";
import music from "./music";
import sleep from "../utils/sleep";

const params = [
  {scope: 50, remainTime: 3000, speed: 1000, moleWeight: 1},
  {scope: 100, remainTime: 2600, speed: 900, moleWeight: 0.8},
  {scope: 150, remainTime: 2400, speed: 800, moleWeight: 0.7},
  {scope: 250, remainTime: 2200, speed: 700, moleWeight: 0.6},
  {scope: 300, remainTime: 2000, speed: 600, moleWeight: 0.5},
  {scope: 350, remainTime: 1800, speed: 550, moleWeight: 0.4},
  {scope: 400, remainTime: 1600, speed: 500, moleWeight: 0.4},
]

function mapScopeToType (x: number) {
  for (let i in params) {
    if (x < params[i].scope) {
      return params[i].moleWeight
    }
  }
  return 0.3
}

function mapScopeToRemainTime(x: number) {
  // 范围内 按范围计算，超出部分
  // 50分 - 50ms
  for (let i in params) {
    if (x < params[i].scope) {
      return params[i].remainTime
    }
  }
  const maxScoper = params[params.length - 1].scope
  const baseRemainTime = params[params.length - 1].remainTime
  const offset = x - maxScoper;
  const value = baseRemainTime - parseInt(`${(offset / 50) * 10}`)
  return Math.max(500, value)
}
function mapScopeToSpeed(x: number) {
  for (let i in params) {
    if (x < params[i].scope) {
      return params[i].speed
    }
  }
  const maxScoper = params[params.length - 1].scope
  const offset = x - maxScoper;
  const baseSpeed = params[params.length - 1].speed
  const value = baseSpeed - parseInt(`${(offset / 50) * 5}`)
  return Math.max(200, value)
}


const defaultData = {
  gameOver: false,
  moles: [0, 0, 0, 0, 0, 0, 0, 0, 0], // 动物类型
  moleCreateTimes: [0, 0, 0, 0, 0, 0, 0, 0, 0], // 动物显示的时间
  moleStatus: [0, 0, 0, 0, 0, 0, 0, 0, 0], // 0 代表正常1代表被击打
  score: 0
}

type TGameType = 'Normal' | 'Roguelike'

export interface IGameConfig {
  remainCount: number
  turnTime: number
  weight: Weight
}

export interface Weight {
  blue_mole: number
  mole: number
  green_mole: number
  red_mole: number
  yellow_mole: number
  black_mole: number
}

export interface UserInfo {
  address: string
  balance: number
  boost: number
  point: number
  connect: number
  life: number
  invitationCode: string
  name: string
}

class GameStore {

  bossConfig = {
    show: false,
    life: 100
  }

  gameType: TGameType = 'Normal'

  shake = false // 是否震动

  userInfo:UserInfo | null = null

  tonAddress = ''// 当前地址

  gameConfig: IGameConfig = {
    remainCount: 0,
    turnTime: 0,
    weight: {
      blue_mole: 0,
      green_mole: 10,
      mole: 0,
      red_mole: 0,
      yellow_mole: 0,
      black_mole: 0
    }
  }


  // 动物类型
  types = [
    {name: 'mole', icon: moleIcon, kIcon: moleIconK, id: 0},
    {name: 'green_mole', icon: greenMole, kIcon: greenMoleK,id: 1},
    {name: 'yellow_mole', icon: yIcon, kIcon: yIconK,id: 2},
    {name: 'blue_mole', icon: blueIcon,kIcon:blueIconK, id: 3},
    {name: 'red_mole', icon: pIcon,kIcon: pIconK, id: 4},
    {name: 'black_mole', icon: blackIcon,kIcon: blackIconK, id: 5,},
  ]

  start = false

  gameState = {
    ...defaultData
  }

  hideTime = [0,0,0,0,0,0,0,0,0] //消失的时间

  maxActive = 7;

  uploadCache: IGameTarget[] = []

  interval:any= null
  submitInterval:any= null
  intervalRun:any= null
  prevAddTime: number = 0 // 上一次出现动物的时间

  constructor() {
    makeAutoObservable(this);
  }

  runBoss = () => {
    this.bossConfig.show = true
  }
  closeBoss = () => {
    this.bossConfig.show = false
  }
  get remainTime() {
    const value = mapScopeToRemainTime(this.userInfo?.point || 0)
    return value
  }

  get speed() {
    const value = mapScopeToSpeed(this.userInfo?.point || 0)
    return value
  }
  getConfig = async () => {
    const data = await getGameConfig();
    if (data.status === 200) {
      this.gameConfig = data.data
    }
  }

  startGame = (type: TGameType) => {
    this.gameType = type;

    // 播放音乐
    music.run()
    // 清除计时器
    this.clean();

    // 检查是否需要隐藏地鼠
    this.interval = setInterval(() => {
      const nowTime = new Date().getTime()
      this.gameState.moleCreateTimes.map((item, i) => {
        if (item > 0 && nowTime - item >= this.remainTime) {
          // 超时隐藏
          this.gameState.moleCreateTimes[i] = 0
          runInAction(() => {
            this.gameState.moles[i] = 0
            this.hideTime[i] = new Date().getTime()
            // this.gameState.moles = [...this.gameState.moles]
          })
        }
      })
    },100)


    // 生成地鼠
    this.intervalRun = setInterval(async () => {
      const activeMoles = this.gameState.moles.filter((mole: any, i: number) => {
        return mole
      }).length;
      if (!this.gameState.gameOver && activeMoles < this.maxActive && this.start) {
        const currentTime = new Date().getTime();
        if ((currentTime - this.prevAddTime) >= this.speed) {
          const randomMole = await this.getRandomMole();
          this.addRandomMole({moleId: randomMole});
          this.prevAddTime = new Date().getTime();
        }
      }
    }, 50)

    // 提交游戏数据
    this.submitInterval = setInterval(async () => {
      if (this.uploadCache.length > 0) {
        const data = await submitGameData([...this.uploadCache])
        console.log('submitGameData', data)
        runInAction(() => {
          this.uploadCache = [];
        })
      }
    }, 2000)
    this.start = true
  }

  getRandomMole= async (): Promise<number> => {
    // 找到下一个点
    const randomMole = Math.floor(Math.random() * Math.floor(8) + 1);
    const mole = this.gameState.moles[randomMole]
    if (mole) {
      // 重新计算
      return await this.getRandomMole();
    }
    const nowTime = new Date().getTime()
    if ((nowTime - this.hideTime[randomMole]) < 800) {
      // 保护期 重新计算
      await sleep(200)
      return await this.getRandomMole();
    }
    return randomMole
  }

  resetGame = () => {
    this.start = false;
    this.gameState = { ...defaultData }
    this.clean();
  }

  clean = () => {
    this.intervalRun && clearInterval(this.intervalRun)
    this.interval && clearInterval(this.interval)
    this.submitInterval && clearInterval(this.submitInterval)
  }

  // 随机获取地鼠类型
  get randomType  () {
    // 根据当前比例
    const moleWeight = parseInt(`${mapScopeToType(this.userInfo?.point || 0) * 100}`)
    let arrData = new Array(100).fill(5);
    // 1 ~ 4 随机
    for (let i = 0; i< moleWeight; i++) {
      const randomNum = Math.floor(Math.random() * 5);
      arrData[i] = randomNum
    }
    const random = Math.floor(Math.random() * 100);
    return arrData[random]
  }

  // 添加地鼠
  addRandomMole = ({ moleId }: { moleId: number }) => {
    this.gameState.moles = this.gameState.moles.map((mole: any, i: any) => {
      if (i === moleId) {
        this.gameState.moleStatus[i] = 0
        this.gameState.moleCreateTimes[i] = new Date().getTime()
        // 随机一个类型
        const typeData = this.randomType;
        return typeData;
      }
      return mole;
    });
  }

  // 抖动屏幕
  runShake = () => {
    if (this.shake) return;
    this.shake = true
    setTimeout(() => {
      this.shake = false
    }, 200)
  }

  vibrate = () => {
    try {
      postEvent('web_app_trigger_haptic_feedback', { type: 'impact', impact_style: 'heavy' });
    } catch (error) {
      
    }
  }

  // 打击地鼠
  whackMole = ({ moleId }: { moleId: number }) => {
    let hitType = -1
    const newData = this.gameState.moles.map((mole: any, i: any) => {
      if (i === moleId) {
        hitType = mole
        this.gameState.moleCreateTimes[i] = 0
        this.hideTime[i] = new Date().getTime()
        this.gameState.moleStatus[i] = 1;
        return 0;
      }
      return mole;
    })
    
    // Normal 模式直接结束游戏
    if (hitType == 5 && this.gameType === 'Normal') {
      this.endGame();
      return 
    }
    const hitTarget = this.types.find(item => item.id === hitType)
    if (hitTarget) {
      const weightData = this.gameConfig.weight[hitTarget.name as keyof Weight]
      this.gameState.moles = newData;

      const point = (weightData * (this.userInfo?.boost || 1))

      const bossScope = 300
      const oldOffset = Math.floor(this.userInfo!.point / bossScope)
      this.userInfo!.point += point
      const newOffset = Math.floor(this.userInfo!.point / bossScope)

      if (point > 0 && this.gameType === "Roguelike" && newOffset > oldOffset) {
        // 跨过bossScope
        this.runBoss();
      }

      this.uploadCache.push({
        target: hitTarget.name,
        hitTime: new Date().getTime()
      })
    }
    
  }

  endGame = async () => {
    this.gameState.gameOver = true
    this.clean();
    music.stop()

    await endGame();
    this.queryUserInfo();
  }

  queryUserInfo = async () => {
    const data = await getUserProfile();
    if (data.status === 200) {
      this.userInfo = data.data;
    }
  }

}

export default new GameStore();