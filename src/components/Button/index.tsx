import React from "react";
import './index.css';
export default ({onClick, children, style, icon}: any) => {
    return(
        <div className="my-button" style={style} onClick={onClick}>
            {
                icon && <img src={icon} className="my-button-icon"></img>
            }
            {children}
        </div>
    )
}