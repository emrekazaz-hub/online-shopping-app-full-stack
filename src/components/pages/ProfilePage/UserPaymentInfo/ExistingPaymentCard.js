import './ExistingPaymentCard.css';
import { useCart } from '../../../CartContext/CartContext';
import React, { useState } from 'react';
import './UserPaymentInfo.css';
import ProfilePage from '../ProfilePage';

const ExistingPaymentCard = () => {

    const { isSignedIn, signedUser, deletePaymentCard } = useCart('');

    const handleDeleteCard = () => {
        deletePaymentCard();
    }

    return (
        <div className="main-page-div">
            <ProfilePage />
            <div className='card-div'>{isSignedIn ?
                <div className="card" style={{ width: '18rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">Payment Card Information</h5>
                        <p> name : {signedUser.name}</p>
                        <p className="card-text"> ****************</p>
                        <p className="">11/26</p>
                        <div className="editGroup">
                            <a href="#" className="bi bi-trash" onClick={handleDeleteCard}></a>
                            <a href="#" className="bi bi-pencil"></a>
                        </div>
                    </div>
                </div>
                :
                <h2>lutfen once giris yapin</h2>
            }
            </div>
        </div>
    );
}

export default ExistingPaymentCard;