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

  maxActive = 3;

  speed = 500

  remainTime = 2000

  interval:any= null

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
            this.gameState.moles = [...this.gameState.moles]
          })
        }
      })
    },200)
    this.start = true
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