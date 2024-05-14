import React from "react";
import './index.css';
export default ({onClick, children, style}: any) => {
    return(
        <div className="my-button" style={style} onClick={onClick}>
            {children}
        </div>
    )
}