import React, { useState, useEffect } from "react";
import './ProfilePage.css';
import { useCart } from "../../CartContext/CartContext";
import UserAdres from "./UserAdress/UserAdress";
import UserPaymentInfo from "./UserPaymentInfo/UserPaymentInfo";
import UserPreviousOrders from "./UserPreviousOrders/UserPreviousOrders";
import Error404 from '../WarningPages/Error404';

const ProfilePage = () => {

    const { handleNavigate, signedUser, isSignedIn, fetchCardInformation, getUserAdress, isAdmin, signedUserAdress, signedUserCard } = useCart();

    const [onClickChange, setOnClickChange] = useState(false);
    const [hasUserCard, setHasUserCard] = useState();
    const [isUserHasCard, setIsUserHasCard] = useState(false); // Kullanıcının kartı olup olmadığını tutacak state

    function deneme(url) {
        handleNavigate(url);
        setOnClickChange(true);
    }

    const handlePaymentCardClick = (e) => {
        e.preventDefault();
        if (signedUserCard) {
            handleNavigate('/existingPaymentCard');
        } else {
            handleNavigate('/userPayment');
        }
        fetchCardInformation();
        console.log('signed user card status : ', signedUserCard)
    }

    const handleAdressClick = (e) => {
        e.preventDefault();
        getUserAdress();
        if (signedUserAdress !== 0) {
            handleNavigate('/existingAdress');
        } else {
            handleNavigate('/userAdress');
        }
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
                        <li className="sidebar-ul-list-row" onClick={handleAdressClick}>
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
                    <h2>{isSignedIn ? `${signedUser.name}'s profile` : <Error404 />}</h2>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
