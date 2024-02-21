import React from "react";
import reloadImg from '../../Images/errorPNG/23.png';
import './Warning.css';

const Error404 = () => {
    return (
        <div className="message-div">
            <h2 className="message-header">Uppss.. Something went wrong</h2>
            <p className="message-details">Chenck if you are logged in.</p>
            <img className="message-img" src={reloadImg}></img>
        </div>
    );
}

export default Error404;