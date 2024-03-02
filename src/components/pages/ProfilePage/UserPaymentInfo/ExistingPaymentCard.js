import './ExistingPaymentCard.css';
import { useCart } from '../../../CartContext/CartContext';
import React, { useState } from 'react';
import './UserPaymentInfo.css';
import ProfilePage from '../ProfilePage';
import UserPaymentInfo from './UserPaymentInfo';

const ExistingPaymentCard = () => {

    const { isSignedIn, signedUser, deletePaymentCard, signedUserCard } = useCart('');

    const handleDeleteCard = () => {
        deletePaymentCard();
    }

    return (
        <div className="main-page-div">
            <ProfilePage />
            <div className='card-div'>{signedUserCard !== null ?
                <div>
                    {signedUserCard.map((card, index) => (
                        <div className="card" style={{ width: '18rem' }}>
                            <div key={index} className="card-body">
                                <h5 className="card-title">Payment Card Information</h5>
                                <p> name : {signedUser.name}</p>
                                <p className="card-text">card no : {card.cardnumberdb}</p>
                                <p className="">11/26</p>
                                <div className="editGroup">
                                    <a href="#" className="bi bi-trash" onClick={handleDeleteCard}></a>
                                    <a href="#" className="bi bi-pencil"></a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                :
                <h2>You do not have a credit card </h2>
            }
            </div>
        </div>
    );
}

export default ExistingPaymentCard;