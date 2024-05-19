import { makeAutoObservable, runInAction } from "mobx";
import cock from '../assets/cock.png';
import elephant from '../assets/elephant.png';
import lion from '../assets/lion.png';
import moleIcon from '../assets/mole.png';
import monkey from '../assets/monkey.png';
import { getGameConfig, getLeaderboard, getProducts } from "../services/api";

interface ILeaderboard{
  name: string;
  point: number
}

class Leaderboard {
    
    datas: ILeaderboard[] = [
    ];
  constructor() {
    makeAutoObservable(this);
  }

  query = async () => {
    const data = await getLeaderboard();
    if (data.status === 200) {
      this.datas = data.data.list
    }
  }
}

export default new Leaderboard();