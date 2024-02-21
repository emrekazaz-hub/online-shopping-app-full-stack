import React from "react";
import reloadImg from '../../Images/errorPNG/1.png';
import './Warning.css';

const Empty = () => {
    return(
        <div className="message-div">
            <h2 className="message-header">There is nothing to see</h2>
            <p className="message-details">Jst some text.. Or chenck if you are logged in.</p>
            <img className="message-img" src={reloadImg} style={{maxHeight: ""}}></img>
        </div>
    );
}

export default Empty;