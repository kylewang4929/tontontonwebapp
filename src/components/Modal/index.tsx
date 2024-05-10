import React, { useEffect, useRef, useState } from "react";
import './index.css'
import { observer } from "mobx-react-lite";

import closeImage from './close.png';
interface IModalParams {
    show: boolean
    title: string
    width?: number | string
    children: any
    style?: any
    onCancel: any
}
export default observer(({title, show, width = 200, children, style, onCancel}: IModalParams) => {
    if (!show) return null
  return (
    <div className="modal-wapper">
        <div className="modal-inner" style={{width, ...style}}>
          <div className="modal-title">
            <div>{title}</div>
            <div onClick={onCancel} className="close-wapper">
              <img className="close-icon" src={closeImage}></img>
            </div>
            </div>
          {children}
        </div>
    </div>
  )
})