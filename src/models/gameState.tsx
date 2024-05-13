import { makeAutoObservable, runInAction, toJS } from "mobx";
import cock from '../assets/mole.png';
import elephant from '../assets/mole.png';
import lion from '../assets/mole.png';
import moleIcon from '../assets/mole.png';
import monkey from '../assets/mole.png';
import { IGameTarget, getGameConfig, getUserProfile, submitGameData } from "../services/api";

const defaultData = {
  gameOver: false,
  moles: [0, 0, 0, 0, 0, 0, 0, 0, 0], // 动物类型
  moleCreateTimes: [0, 0, 0, 0, 0, 0, 0, 0, 0], // 动物显示的时间
  score: 0
}

export interface IGameConfig {
  remainCount: number
  turnTime: number
  weight: Weight
}

export interface Weight {
  godzilla: number
  mole: number
  doge: number
}

export interface UserInfo {
  address: string
  balance: number
  boost: number
  point: number
  connect: number
  invitationCode: string
  name: string
}

class GameStore {
  userInfo:UserInfo | null = null

  tonAddress = ''// 当前地址

  gameConfig: IGameConfig = {
    remainCount: 0,
    turnTime: 0,
    weight: {
      godzilla: 0,
      mole: 0,
      doge: 0
    }
  }

  // 动物类型
  types = [
    {icon: moleIcon, id: 0},
    {icon: cock, id: 1},
    {icon: elephant, id: 2},
    {icon: lion, id: 3},
    {icon: monkey, id: 4},
  ]

  start = false

  gameState = {
    ...defaultData
  }

  hideTime = [0,0,0,0,0,0,0,0,0] //消失的时间

  maxActive = 7;

  speed = 700

  remainTime = 2000

  uploadCache: IGameTarget[] = []

  interval:any= null
  submitInterval:any= null
  intervalRun:any= null

  constructor() {
    makeAutoObservable(this);
  }

  getConfig = async () => {
    const data = await getGameConfig();
    console.log('data', data)
    if (data.status === 200) {
      this.gameConfig = data.data
    }
  }

  startGame = () => {
    this.clean();
    this.interval = setInterval(() => {
      const nowTime = new Date().getTime()
      this.gameState.moleCreateTimes.map((item, i) => {
        if (item > 0 && nowTime - item >= this.remainTime) {
          this.gameState.moleCreateTimes[i] = 0
          runInAction(() => {
            this.gameState.moles[i] = 0
            this.hideTime[i] = new Date().getTime()
            // this.gameState.moles = [...this.gameState.moles]
          })
        }
      })
    },100)


    this.intervalRun = setInterval(() => {
      const activeMoles = this.gameState.moles.filter((mole: any, i: number) => {
        return mole
      }).length;
      if (!this.gameState.gameOver && activeMoles < this.maxActive && this.start) {
        const randomMole = this.getRandomMole();
        this.addRandomMole({moleId: randomMole});
      }
    }, this.speed)

    this.submitInterval = setInterval(async () => {
      console.log('this.uploadCache', toJS(this.uploadCache))
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

  getRandomMole= (): number => {
    // 找到下一个点
    const randomMole = Math.floor(Math.random() * Math.floor(8) + 1);
    const mole = this.gameState.moles[randomMole]
    if (mole) {
      // 重新计算
      return this.getRandomMole();
    }
    const nowTime = new Date().getTime()
    if ((nowTime - this.hideTime[randomMole]) < 400) {
      // 保护期 重新计算
      return this.getRandomMole();
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

  getRandomType = () => {
    const random = Math.floor(Math.random() * Math.floor(this.types.length));
    return random
  }

  addRandomMole = ({ moleId }: { moleId: number }) => {
    this.gameState.moles = this.gameState.moles.map((mole: any, i: any) => {
      if (i === moleId) {
        this.gameState.moleCreateTimes[i] = new Date().getTime()
        // 随机一个类型
        const typeData = this.getRandomType();
        return typeData;
      }
      return mole;
    });
  }

  whackMole = ({ moleId }: { moleId: number }) => {
    /**
     * TODO 
     * 计算积分
     * 缓存数据
     * 调用接口上报
     */
    const newData = this.gameState.moles.map((mole: any, i: any) => {
      if (i === moleId) {
        this.gameState.moleCreateTimes[i] = 0
        this.hideTime[i] = new Date().getTime()
        return 0;
      }
      return mole;
    })
    this.gameState.moles = newData;
    this.gameState.score += 1

    this.uploadCache.push({
      target: 'mole',
      hitTime: new Date().getTime()
    })
  }

  endGame = () => {
    this.gameState.gameOver = true
    this.clean();

  }

  queryUserInfo = async () => {
    const data = await getUserProfile();
    console.log('data', data)
    if (data.status === 200) {
      this.gameState.score = data.data.point
    }
  }

}

export default new GameStore();