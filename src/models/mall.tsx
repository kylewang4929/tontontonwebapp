import { makeAutoObservable, runInAction } from "mobx";
import cock from '../assets/cock.png';
import elephant from '../assets/elephant.png';
import lion from '../assets/lion.png';
import moleIcon from '../assets/mole.png';
import monkey from '../assets/monkey.png';
import { getGameConfig, getProducts } from "../services/api";

const defaultData = {
  gameOver: false,
  moles: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  moleCreateTimes: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  score: 0
}

export interface IProduct {
    currency: string
    kind: string
    name: string
    price: number
}

class GameStore {
    
    products: IProduct[] = [];
  constructor() {
    makeAutoObservable(this);
    this.query()
  }

  query = async () => {
    const data = await getProducts();
    if (data.status === 200) {
      this.products = Object.values(data.data).map((item: any) => {
        return {
            ...item
        }
      })
    }
  }
}

export default new GameStore();