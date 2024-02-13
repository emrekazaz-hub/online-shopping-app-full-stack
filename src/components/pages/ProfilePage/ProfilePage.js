import React, { useState, useEffect } from "react";
import './ProfilePage.css';
import { useCart } from "../../CartContext/CartContext";
import UserAdres from "./UserAdress/UserAdress";
import UserPaymentInfo from "./UserPaymentInfo/UserPaymentInfo";
import UserPreviousOrders from "./UserPreviousOrders/UserPreviousOrders";

const ProfilePage = () => {

    const { handleNavigate, signedUser, isSignedIn, fetchCardInformation } = useCart();

    const [onClickChange, setOnClickChange] = useState(false);
    const [hasUserCard, setHasUserCard] = useState();
    const [isUserHasCard, setIsUserHasCard] = useState(false); // Kullanıcının kartı olup olmadığını tutacak state

    function deneme(url) {
        handleNavigate(url);
        setOnClickChange(true);
    }

    const handlePaymentCardClick = (e) => {
        e.preventDefault();
        fetchCardInformation();
    }

    return (
        <div>
            <h2 className="profile-header"></h2>
            <div className="page-view">
                <div className="sidebar">
                    <ul className="sidebar-ul-list">
                        <li className="sidebar-ul-list-row" onClick={() => handleNavigate('/profilePage')}>
                            User Info
                        </li>
                        <li className="sidebar-ul-list-row" onClick={() => handleNavigate('/userAdress')}>
                            My Registered Addresses
                        </li>
                        <li className="sidebar-ul-list-row" onClick={handlePaymentCardClick}>
                            Payment Information
                        </li>
                        <li className="sidebar-ul-list-row" onClick={() => handleNavigate('/userPreviousOrder')}>
                            My Previous Orders
                        </li>
                    </ul>
                </div>

                <div>
                    <h2>{isSignedIn ? `${signedUser.name}'s profile` : "sign in pls"}</h2>
                </div>

                <div>
                    <div>
                        { }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
