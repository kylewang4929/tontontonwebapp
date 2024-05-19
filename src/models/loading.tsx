import { makeAutoObservable, runInAction } from "mobx";

class Loading {
    show= false
    
  constructor() {
    makeAutoObservable(this);
  }
  loading () {
    this.show= true
  }
  hide () {
    this.show= false
  }
}

export default new Loading();