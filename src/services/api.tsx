
import axios from 'axios';
import gameState from '../models/gameState';



axios.interceptors.request.use(config => {
    config.headers['Ton-Address'] = gameState.tonAddress;
    return config;
})
interface IBindAccountParams {
    address: string;
    network: string;
    publicKey?: string;
    walletStateInit: string
}
// const host = 'http://120.79.55.90:8090'
const host = ''
// const host = 'https://moleverse.net'
// const host = 'https://www.gg4892hv.online'

export const bindAccount = async (params: IBindAccountParams) => {
    return await axios.post(`${host}/api/user/connectWallet`, {
        ...params
      })
}
interface IUnBindAccountParams {
    address: string;
}
export const unBindAccount = async (params: IUnBindAccountParams) => {
    return await axios.post(`${host}/api/user/disconnectWallet`, {
        ...params
      })
}

export const getGameConfig = async () => {
    return await axios.get(`${host}/api/game/config`, {
      })
}

export const getProducts = async () => {
    return await axios.get(`${host}/api/game/product`, {
      })
}

export const getUserProfile = async () => {
    return await axios.get(`${host}/api/user/detail`, {
      })
}

export interface IGameTarget {
    target: string
    hitTime: number
}
export const submitGameData = async (params: IGameTarget[]) => {
    return await axios.post(`${host}/api/game/submit`, {
        hitList: params
    })
}
interface IOrderParams{
    id: string // 商品id
}
export const createOrder = async (params: IOrderParams) => {
    return await axios.post(`${host}/api/pay/create`, {
        productName: params.id
    })
}

interface IUpdateOrderParasm {
    orderId: string;
    boc: string
}
export const updateOrder = async (p: IUpdateOrderParasm) => {
    return await axios.post(`${host}/api/pay/update`, {
        ...p
    })
}

export interface IOrder {
    orderId: string
    createTime: string
    status: 'init' | 'pending' |'success' | 'fail' | 'cancel'
    itemData: IOrderItem
  }
  
  export interface IOrderItem {
    kind: string
    name: string
    price: number
    currency: string
  }
  
export const queryOrder = async (orderId: string) => {
    return await axios.post<IOrder>(`${host}/api/pay/query`, {
        orderId
    })
}



export const getLeaderboard = async () => {
    return await axios.get(`${host}/api/leaderboard`, {
    })
}


export const endGame = async () => {
    return await axios.get(`${host}/api/game/end`, {
    })
}


export const queryTasks = async () => {
    return await axios.get(`${host}/api/task/list`, {
    })
}

