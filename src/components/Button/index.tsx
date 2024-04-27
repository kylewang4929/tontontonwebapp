import React from "react";
import './index.css';
export default ({onClick, children}: any) => {
    return(
        <div className="my-button" onClick={onClick}>{children}</div>
    )
}