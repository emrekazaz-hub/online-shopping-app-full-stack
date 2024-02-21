import React from "react";
import reloadImg from '../../Images/errorPNG/2.png';
import './Warning.css';

const Reload = () => {
    return(
        <div className="message-div">
            <h2 className="message-header">Please Reload</h2>
            <p className="message-details">If you cannot see your address information, please click on your address information again. Or chenck if you are logged in.</p>
            <img className="message-img" src={reloadImg}></img>
        </div>
    );
}

export default Reload;