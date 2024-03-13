import React, { useState } from "react";
import Pagination from "../../Pagination/Pagination";
import { useCart } from "../../../../CartContext/CartContext";
import './PaginationCard.css';

const PaginationCard = () => {

    const { handleStepChange, handleNavigate, signedUserCard } = useCart();

    const [currentCardBackground, setCurrentCardBackground] = useState(Math.floor(Math.random() * 25 + 1));

    const handleApproveClick = () => {
        handleStepChange(2);
        handleNavigate('/paginationAddress');
    }

    const handleBackClick = () => {
        handleStepChange(0);
        handleNavigate('/paymentCard');
    }


    return (
        <div>
            <h2>pagination card page</h2>
            <div>
                <Pagination />

                <div>
                    {signedUserCard.map((card, index) => (
                        <div className="card card-item__bg" style={{ width: '18rem', backgroundImage: `url(https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${currentCardBackground}.jpeg)` }}>
                            <div key={index} className="card-body">
                                <h5 className="card-title">Card Owner : {card.cardnamedb}</h5>
                                <p className="card-text">card no : ************{card.cardnumberdb.substring(card.cardnumberdb.length - 4)}</p>
                                <p className="card-date">{card.cardmonthdb}/{card.cardyerdb.substring(card.cardyerdb.length - 2)}</p>
                                <p>balance : ${card.balance}</p>
                            </div>
                        </div>
                    ))}
                </div>


                {console.log(signedUserCard)}
                
                <div className='butn-group-payment'>
                    <button className='btn btn-success' onClick={handleApproveClick}>Approve Items</button>
                    <button className='btn btn-dark' onClick={handleBackClick}>Go Back</button>
                </div>
            </div>

        </div>
    );
}

export default PaginationCard;