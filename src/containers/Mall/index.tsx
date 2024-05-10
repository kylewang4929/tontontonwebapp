import React, { useEffect, useRef, useState } from "react";
import './index.css'
import { observer } from "mobx-react-lite";
import Modal from "../../components/Modal";
import mall from "../../models/mall";

export default observer(() => {
    
    const [show, setShow] = useState(false)
  return (
    <div className="mall-container">
        <button onClick={() => setShow(true)} className="mall-button round-button">M</button>
        <Modal title="商店" onCancel={() => {
            setShow(false)
        }} show={show} width={'100%'} style={{backgroundColor: '#222'}}>
            <div className="mall-modal-wapper">
                <div className="mall-content">
                    {
                        mall.products.map(item => {
                            return (<Item key={item.name} name={item.name}></Item>)
                        })
                    }
                </div>
            </div>
        </Modal>
    </div>
  )
})

const Item = ({name}: any) => {
    return (
        <div style={{width: '33.33%', color: '#fff', display: 'inline-block', textAlign: 'center'}}>
            <div className="mall-product" style={{display: 'inline-block'}}></div>
            <div>{name}</div>
        </div>
    )
}