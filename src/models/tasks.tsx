import { makeAutoObservable, runInAction } from "mobx";
import { queryTasks } from "../services/api";

interface ITask {
  taskid: number;
  name: string;
  point: number;
  life: number;
}

class GameStore {
    
  datas: ITask[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  query = async () => {
    const data = await queryTasks()
    if (data.status === 200) {
        this.datas = data.data.taskList;
        console.log('tasks data', JSON.stringify(this.datas));
    }
  }
}

export default new GameStore();