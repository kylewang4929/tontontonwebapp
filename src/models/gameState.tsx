import { makeAutoObservable, runInAction } from "mobx";
import cock from '../assets/cock.png';
import elephant from '../assets/elephant.png';
import lion from '../assets/lion.png';
import moleIcon from '../assets/mole.png';
import monkey from '../assets/monkey.png';

const defaultData = {
  gameOver: false,
  moles: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  moleCreateTimes: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  score: 0
}

class GameStore {

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

  hideTime = [0,0,0,0,0,0,0,0,0]

  maxActive = 7;

  speed = 700

  remainTime = 2000

  interval:any= null
  intervalRun:any= null

  constructor() {
    makeAutoObservable(this);
  }

  startGame = () => {
    this.interval && clearInterval(this.interval)
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
    this.interval && clearInterval(this.interval)
    this.gameState = { ...defaultData }
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
  }

  endGame = () => {
    this.interval && clearInterval(this.interval)
    this.gameState.gameOver = true
  }

}

export default new GameStore();