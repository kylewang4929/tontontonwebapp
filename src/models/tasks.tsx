import { makeAutoObservable, runInAction } from "mobx";
import { queryTasks } from "../services/api";

class GameStore {
    
    datas: any[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  query = async () => {
    const data = await queryTasks()
    if (data.status === 200) {
        // this.datas = data.data
    }
  }
}

export default new GameStore();