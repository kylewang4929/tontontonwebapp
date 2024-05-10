
import axios from 'axios';

interface IBindAccountParams {
    address: string;
    network: string;
    publicKey?: string;
    walletStateInit: string
}
const host = 'http://120.79.55.90:8090'
export const bindAccount = async (params: IBindAccountParams) => {
    return await axios.post(`/api/user/connectWallet`, {
        ...params
      })
}
interface IUnBindAccountParams {
    address: string;
}
export const unBindAccount = async (params: IUnBindAccountParams) => {
    return await axios.post(`/api/user/disconnectWallet`, {
        ...params
      })
}

export const getGameConfig = async () => {
    return await axios.get(`/api/game/config`, {
      })
}

export const getProducts = async () => {
    return await axios.get(`/api/game/product`, {
      })
}