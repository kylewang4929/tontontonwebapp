import './index.css'
import { Locales, useTonConnectUI } from '@tonconnect/ui-react';
import fIcon from './images/4-1.png.png';
import dIcon from './images/Frame3.png';
import huojianIcon from './images/huojian.png';
import moneyIcon from './images/money-1.png.png';
import mainAddress from '../../config/mainAddress';

const datas = [
    {icon: dIcon, name: 'Game X2'},
    {icon: fIcon, name: 'Friends'},
    {icon: moneyIcon, name: 'Earn'},
    {icon: huojianIcon, name: 'Boosts'},
]

export default () => {
    const [tonConnectUI, setOptions] = useTonConnectUI();
    return (
        <div className='tool-bar'>
            {
                datas.map((item, index) => {
                    return <Item key={item.name} onClick={() => {
                        const myTransaction = {
                            validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
                            messages: [
                                {
                                    address: mainAddress,
                                    amount: "100000000",
                                    // stateInit: "base64bocblahblahblah==" // just for instance. Replace with your transaction initState or remove
                                },
                            ]
                        }
                        tonConnectUI.sendTransaction(myTransaction)
                    }} {...item} border={index !== datas.length - 1}></Item>
                })
            }
        </div>
    )
}

const Item = ({name,icon, border, onClick}: any) => {
    return (
        <div onClick={onClick} className={`item ${border ? "border": ''}`}>
            <img src={icon}></img>
            <span>{name}</span>
        </div>
    )
}