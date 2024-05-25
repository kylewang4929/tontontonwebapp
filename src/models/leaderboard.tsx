import { makeAutoObservable } from "mobx";
import { getLeaderboard } from "../services/api";

interface ILeaderboard {
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