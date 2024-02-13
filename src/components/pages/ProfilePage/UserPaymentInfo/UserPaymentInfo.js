import React, { useEffect, useState, useRef } from 'react';
import ProfilePage from '../ProfilePage';
import './UserPaymentInfo.css';
import { useCart } from '../../../CartContext/CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserPaymentInfo = () => {
    const [currentCardBackground, setCurrentCardBackground] = useState(Math.floor(Math.random() * 25 + 1));
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardMonth, setCardMonth] = useState('');
    const [cardYear, setCardYear] = useState('');
    const [cardCvv, setCardCvv] = useState('');
    const [minCardYear, setMinCardYear] = useState(new Date().getFullYear());
    const amexCardMask = "#### ###### #####";
    const otherCardMask = "#### #### #### ####";
    const [focusElementStyle, setFocusElementStyle] = useState(null);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [isCardFlipped, setIsCardFlipped] = useState(false); // isCardFlipped'i tanımla

    const { genelId, isSignedIn, signedUser, addPaymentCard, handleNavigate, } = useCart();

    useEffect(() => {
        document.getElementById("cardNumber").focus();
    }, []);

    // we are going to use this fuc just for now to keep simple we use handleUserCard
    const handleAddPaymentCard = () => {
        addPaymentCard(cardName, cardNumber, cardMonth, cardYear, cardCvv);
    }

    const handleUserCard = () => {
        if (!isSignedIn) {
            alert('please login first');
        }
        const userId = signedUser.id;
        fetch(`http://localhost:3000/profile/cardpayment-new/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userCardName: cardName,
                userCardNumber: cardNumber,
                userCardMonth: cardMonth,
                userCardYear: cardYear,
                userCardCvv: cardCvv,
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.status === 'addnewcard') {
                    console.log('Your card has been added successfully');
                    toast('Your card has been added successfully');
                }
                if (data.status === 'erraddcard') {
                    console.log('kart eklerken bir hata olustu');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


    const getCardType = () => {
        let number = cardNumber;
        let re = new RegExp("^4");
        if (number.match(re) != null) return "visa";

        re = new RegExp("^(34|37)");
        if (number.match(re) != null) return "amex";

        re = new RegExp("^5[1-5]");
        if (number.match(re) != null) return "mastercard";

        re = new RegExp("^6011");
        if (number.match(re) != null) return "discover";

        re = new RegExp('^9792')
        if (number.match(re) != null) return 'troy'

        return "visa"; // default type
    };

    const generateCardNumberMask = () => {
        return getCardType() === "amex" ? amexCardMask : otherCardMask;
    };

    const minCardMonth = () => {
        if (cardYear === minCardYear) return new Date().getMonth() + 1;
        return 1;
    };

    const flipCard = (status) => {
        setIsCardFlipped(status);
    };

    const focusInput = (e) => {
        setIsInputFocused(true);
        let targetRef = e.target.dataset.ref;
        if (!targetRef) {
            console.error("Target reference is missing.");
            return;
        }
        let target = document.getElementById(targetRef);
        if (!target) {
            console.error(`Target element with ID '${targetRef}' not found.`);
            return;
        }
        setFocusElementStyle({
            width: `${target.offsetWidth}px`,
            height: `${target.offsetHeight}px`,
            transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`
        });
    };


    const blurInput = () => {
        setTimeout(() => {
            if (!isInputFocused) {
                setFocusElementStyle(null);
            }
        }, 300);
        setIsInputFocused(false);
    };


    return (
        <div>
            <div className='main-page-div'>
                <ProfilePage />
                <div className='payment-card'>
                    <div>
                        <div className="payment-card-div">
                            <div>
                                <div className="wrapper" id="app">
                                    <div className="card-form">
                                        <div className="card-list">
                                            <div className={`card-item ${isCardFlipped ? '-active' : ''}`}>
                                                <div className="card-item__side -front">
                                                    <div className={`card-item__focus ${focusElementStyle ? '-active' : ''}`} style={focusElementStyle}></div>
                                                    <div className="card-item__cover">
                                                        <img src={`https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${currentCardBackground}.jpeg`} className="card-item__bg" alt="" />
                                                    </div>

                                                    <div className="card-item__wrapper">
                                                        <div className="card-item__top">
                                                            <img src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png" className="card-item__chip" alt="" />
                                                            <div className="card-item__type">
                                                                {getCardType() && (
                                                                    <img src={`https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${getCardType()}.png`} alt="" className="card-item__typeImg" />
                                                                )}
                                                            </div>
                                                        </div>
                                                        <label htmlFor="cardNumber" className="card-item__number">
                                                            <span>
                                                                {cardNumber.length > 0 ? (
                                                                    cardNumber.match(/.{1,4}/g).map((group, index) => (
                                                                        <span key={index}>
                                                                            {group}
                                                                            {index < 3 && ' '}
                                                                        </span>
                                                                    ))
                                                                ) : (
                                                                    <span>1234 5678 9123 4567</span>
                                                                )}
                                                            </span>
                                                        </label>

                                                        <div className="card-item__content">
                                                            <label htmlFor="cardName" className="card-item__info">
                                                                <div className="card-item__holder">Card Holder</div>
                                                                <div className="card-item__name">
                                                                    {cardName.length ? cardName.replace(/\s\s+/g, '').split('').map((n, index) => (
                                                                        <span key={index} className="card-item__nameItem">{n}</span>
                                                                    )) : 'Full Name'}
                                                                </div>
                                                            </label>
                                                            <div className="card-item__date">
                                                                <label htmlFor="cardMonth" className="card-item__dateTitle">Expires</label>
                                                                <label htmlFor="cardMonth" className="card-item__dateItem">
                                                                    <span>{cardMonth || 'MM'}</span>
                                                                </label>
                                                                /
                                                                <label htmlFor="cardYear" className="card-item__dateItem">
                                                                    <span>{cardYear || 'YY'}</span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-item__side -back">
                                                    <div className="card-item__cover">
                                                        <img src={`https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${currentCardBackground}.jpeg`} className="card-item__bg" alt="" />
                                                    </div>
                                                    <div className="card-item__band"></div>
                                                    <div className="card-item__cvv">
                                                        <div className="card-item__cvvTitle">CVV</div>
                                                        <div className="card-item__cvvBand">
                                                            {cardCvv.split('').map((n, index) => (
                                                                <span key={index}>*</span>
                                                            ))}
                                                        </div>
                                                        <div className="card-item__type">
                                                            {getCardType() && (
                                                                <img src={`https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${getCardType()}.png`} alt="" className="card-item__typeImg" />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-form__inner">
                                            <div className="card-input">
                                                <label htmlFor="cardNumber" className="card-input__label">Card Number</label>
                                                <input type="text" id="cardNumber" className="card-input__input" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} onFocus={focusInput} onBlur={blurInput} data-ref="cardNumber" autoComplete="off" />
                                            </div>
                                            <div className="card-input">
                                                <label htmlFor="cardName" className="card-input__label">Card Holders</label>
                                                <input type="text" id="cardName" className="card-input__input" value={cardName} onChange={(e) => setCardName(e.target.value)} onFocus={focusInput} onBlur={blurInput} data-ref="cardName" autoComplete="off" />
                                            </div>
                                            <div className="card-form__row">
                                                <div className="card-form__col">
                                                    <div className="card-form__group">
                                                        <label htmlFor="cardMonth" className="card-input__label">Expiration Date</label>
                                                        <select className="card-input__input -select" id="cardMonth" value={cardMonth} onChange={(e) => setCardMonth(e.target.value)} onFocus={focusInput} onBlur={blurInput} data-ref="cardDate">
                                                            <option value="" disabled selected>Month</option>
                                                            {Array.from({ length: 12 }, (_, i) => {
                                                                const month = i + 1;
                                                                return <option key={month} value={month < 10 ? '0' + month : month}>{month < 10 ? '0' + month : month}</option>;
                                                            })}
                                                        </select>
                                                        <select className="card-input__input -select" id="cardYear" value={cardYear} onChange={(e) => setCardYear(e.target.value)} onFocus={focusInput} onBlur={blurInput} data-ref="cardDate">
                                                            <option value="" disabled selected>Year</option>
                                                            {Array.from({ length: 12 }, (_, i) => {
                                                                const year = minCardYear + i;
                                                                return <option key={year} value={year}>{year}</option>;
                                                            })}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="card-form__col -cvv">
                                                    <div className="card-input">
                                                        <label htmlFor="cardCvv" className="card-input__label">CVV</label>
                                                        <input type="text" className="card-input__input" id="cardCvv" value={cardCvv} maxLength="4" onChange={(e) => setCardCvv(e.target.value)} onFocus={() => flipCard(true)} onBlur={() => flipCard(false)} autoComplete="off" />
                                                    </div>
                                                </div>
                                            </div>

                                            <button className="card-form__button" onClick={handleUserCard}>
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserPaymentInfo;
