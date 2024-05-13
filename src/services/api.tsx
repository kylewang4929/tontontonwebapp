
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
const host = 'http://120.79.55.90:8090'
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
    target: 'mole'
    hitTime: number
}
export const submitGameData = async (params: IGameTarget[]) => {
    return await axios.post(`${host}/api/game/submit`, {
        hitList: params
    })
}