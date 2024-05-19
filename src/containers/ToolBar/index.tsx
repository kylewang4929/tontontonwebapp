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
import Mission from '../Tasks';
import { useEffect, useState } from 'react';
import Leaderboard from '../Leaderboard';
import { ToastContainer, toast } from 'react-toastify';
import loading from '../../models/loading';
import products from '../../models/products';
import { toJS } from 'mobx';

const TON_UNIT = 1000000000
export default () => {
    const [tonConnectUI, setOptions] = useTonConnectUI();
    const [openMission, setOpenMission] = useState(false)
    const [openLeaderBoard, setOpenLeaderBoard] = useState(false)

    useEffect(() => {
      products.query()
    }, [])

    const handlePay = async(res: {boc: string}, order: any) => {
        // TODO loading
        loading.loading()
        const data = await updateOrder({
            boc: res.boc,
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
                    loading.hide()
                    toast.error('Payment timeout')
                    return;
                }
                const querData = await queryOrder(order.orderId)
                if (querData.status === 200) {
                    // 判断支付状态
                    switch(querData.data.status) {
                        case 'fail': {
                            // 提示支付失败
                            loading.hide()
                            toast.error('Payment failed')
                            return
                        }
                        case 'success': {
                            // 提示支付成功
                            loading.hide()
                            toast.success('Payment successful')
                            return
                        }
                        case 'cancel': {
                            // 提示取消
                            loading.hide()
                            toast.error('Payment cancellation')
                            return;
                        }
                    }
                }
                await sleep(2000)
            }
        } else {
            // TODO 提示失败
            toast.error('Payment failed')
            loading.hide()
        }
    };
    const createPay = async (item: any) => {
        // 先创建订单
        console.log('createPay', item)
        const data = await createOrder({id: item.productId})
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
                        amount: `${TON_UNIT * item.price}`,
                        payload: body.toBoc().toString("base64")
                    },
                ]
            }
            const res = await tonConnectUI.sendTransaction(myTransaction)
            handlePay(res, data.data)
        } else {
            // TODO 提示订单创建失败
            toast.error('Failed to create order')
        }
    }


    const datas = [
        ...products.products.map(item => {
            return {
                icon: dIcon,
                id: item.name,
                ...item,
            }
        }),
        {icon: fIcon, name: 'Tasks', id: "TASKS",},
        {icon: moneyIcon, name: 'Ranking', id: "RANKING"},
    ]
    return (
        <div className='tool-bar'>
            {
                datas.map((item, index) => {
                    return <Item key={`${item.name}${index}`} onClick={async () => {
                        switch (item.name) {
                            case 'Boost3X':
                            case 'Boost2X': {
                                createPay(item);
                                break
                            }
                            case 'Tasks': {
                                setOpenMission(true)
                                break
                            }
                            case 'Ranking': {
                                setOpenLeaderBoard(true)
                                break
                            }
                        }
                    }} {...item} border={index !== datas.length - 1}></Item>
                })
            }
            <Mission open={openMission} onCancel={() => {
                setOpenMission(false)
            }}></Mission>
            <Leaderboard open={openLeaderBoard} onCancel={() => {
                setOpenLeaderBoard(false)
            }}></Leaderboard>
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