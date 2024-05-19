import { makeAutoObservable, runInAction } from "mobx";

class GameStore {
    
    datas: any[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  query = async () => {
  }
}

export default new GameStore();