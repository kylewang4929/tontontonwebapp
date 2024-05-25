import { makeAutoObservable } from "mobx";
import { getProducts } from "../services/api";

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
  }

  query = async () => {
    const data = await getProducts();
    if (data.status === 200) {
      const newData = Object.keys(data.data).map(key => {
        return {
          ...data.data[key],
          productId: key
        }
      })
      this.products = newData.filter(item => item.currency === 'TON')
    }
  }
}

export default new GameStore();