import './ExistingAdress.css';
import './UserAdress.css';
import ProfilePage from '../ProfilePage';
import { useCart } from '../../../CartContext/CartContext';
import mapimg from '../../../Images/map.png';
import React, { useState, useEffect } from 'react';
import Reload from '../../WarningPages/Reload';


const ExistingAdress = () => {

    const [adress, setAdress] = useState([]);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);

    const { signedUser, signedUserAdress, handleAddNewAdress, isAdressSelected } = useCart();
    const [color, setColor] = useState();

    useEffect(() => {
        setAdress(signedUserAdress);
    }, [signedUserAdress]);

    const handleCardClick = (index) => {
        setSelectedCardIndex(index);
        // Kartın index'ini kullanarak yapmak istediğiniz işlemi burada gerçekleştirebilirsiniz
    };



    return (
        <div className='userAdres-div'>
            <ProfilePage />
            {console.log('length', signedUserAdress.length)}
            {signedUserAdress.length < 1
                ?
                <Reload />
                :
                <div className='main'>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <button className='bi bi-plus-circle userAdres-button' onClick={handleAddNewAdress}> Add new adress</button>
                    </div>
                    {
                        adress.map((props, index) => {
                            return (
                                <div key={index}>
                                    <div className='userAdres'>
                                        <div
                                            className={`userAdres-card ${index === selectedCardIndex ? 'userAdres-card-true' : 'userAdres-card-false'}`}
                                            onClick={() => handleCardClick(index)}
                                        >
                                            {console.log('index:', selectedCardIndex)}
                                            <button className='bi bi-check-circle-fill userAdres-button' style={{ color: "green" }}></button>
                                            <img src={mapimg} className='userAdres-img'></img>
                                            <div className='userAdress-card-content'>
                                                <p>Location : {props.adress}</p>
                                                {console.log('secili mi ? ', props.selected_adress)}
                                            </div>
                                            <div className='userAdres-button-group'>
                                                <button className='bi bi-trash userAdres-button'></button>
                                                <button className='bi bi-pencil userAdres-button'></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }

                </div>
            }

        </div>
    );
}

export default ExistingAdress;

{/*
                    <div className='userAdres-button-group'>
                        <button className='bi bi-plus-circle userAdres-button'></button>
                        <button className='bi bi-trash userAdres-button'></button>
                    </div>
                 */}