import './index.css'
import { Locales, useTonConnectUI } from '@tonconnect/ui-react';
import { beginCell } from 'ton-core'
import fIcon from './images/4-1.png.png';
import dIcon from './images/Frame3.png';
import huojianIcon from './images/huojian.png';
import moneyIcon from './images/money-1.png.png';
import mainAddress from '../../config/mainAddress';
import { createOrder, queryOrder, updateOrder } from '../../services/api';
import sleep from '../../utils/sleep';

const datas = [
    {icon: dIcon, name: 'Game X2'},
    {icon: fIcon, name: 'Friends'},
    {icon: moneyIcon, name: 'Earn'},
    {icon: huojianIcon, name: 'Boosts'},
]

const TON_UNIT = 1000000000
export default () => {
    const [tonConnectUI, setOptions] = useTonConnectUI();
    const handlePay = async(res: {boc: string}, order: any) => {
        // TODO loading
        const data = await updateOrder({
            boc: res.boc,
            txId: order.txId,
            orderId: order.orderId
        })
        if (data.status === 200) {
            // 更新成功
            const startTime = new Date().getTime()
            // 超时取消
            while(true) {
                const nowTime = new Date().getTime()
                if (nowTime - startTime > 60 * 1000) {
                    // 提示超时
                    return;
                }
                const querData = await queryOrder(order.orderId)
                if (querData.status === 200) {
                    // 判断支付状态
                    switch(querData.data.status) {
                        case 'fail': {
                            // 提示支付失败
                            return
                        }
                        case 'success': {
                            // 提示支付成功
                            return
                        }
                        case 'cancel': {
                            // 提示取消
                            return;
                        }
                    }
                }
                sleep(1000)
            }
        } else {
            // TODO 提示失败
        }
    };
    return (
        <div className='tool-bar'>
            {
                datas.map((item, index) => {
                    return <Item key={item.name} onClick={async () => {
                        // 先创建订单
                        const data = await createOrder({id: 'boost2xton'})
                        if (data.status === 200) {
                            const { orderId } = data.data;
                            const body = beginCell()
                            .storeUint(0, 32) // 写入32个零位以表示后面将跟随文本评论
                            .storeStringTail(`${JSON.stringify({orderId})}`) // 写下我们的文本评论
                            .endCell();
                            
                            const myTransaction = {
                                validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
                                messages: [
                                    {
                                        address: mainAddress,
                                        amount: `${TON_UNIT * 0.1}`,
                                        payload: body.toBoc().toString("base64")
                                    },
                                ]
                            }
                            const res = await tonConnectUI.sendTransaction(myTransaction)
                            handlePay(res, data.data)
                        } else {
                            // TODO 提示订单创建失败
                        }
                        
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