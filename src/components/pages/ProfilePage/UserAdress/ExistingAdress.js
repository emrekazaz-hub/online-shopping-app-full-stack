import './ExistingAdress.css';
import './UserAdress.css';
import ProfilePage from '../ProfilePage';
import { useCart } from '../../../CartContext/CartContext';
import mapimg from '../../../Images/map.png';
import React, { useState, useEffect } from 'react';
import Reload from '../../WarningPages/Reload';


const ExistingAdress = () => {

    //console.log(process.env.GOOGLE_MAPS_API_KEY)

    const [adress, setAdress] = useState([]);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);

    const { signedUser, signedUserAdress, handleAddNewAdress, isAdressSelected, getLocationForMap, coordinates, apiKey } = useCart();
    const [color, setColor] = useState();

    useEffect(() => {
        setAdress(signedUserAdress);
        getLocationForMap(); // Koordinatları güncelle
    }, [signedUserAdress]);

    const handleCardClick = (index) => {
        setSelectedCardIndex(index);
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
                                <div key={index} style={{ border: '1px solid rgb(176, 176, 176)' }}>
                                    <div className='userAdres-google-api'>
                                        <div>
                                            <h2>{props.adress_username}</h2>
                                            <p>{props.adress_adress}</p>
                                        </div>
                                        <div>
                                            <i className="bi bi-geo-alt-fill" style={{ fontSize: '30px' }}></i>
                                        </div>
                                    </div>

                                    <div>
                                        <iframe
                                            width="550"
                                            height="150"
                                            style={{border: '0'}}
                                            loading="lazy"
                                            allowfullscreen
                                            referrerpolicy="no-referrer-when-downgrade"
                                            src={`https://www.google.com/maps/embed/v1/place?key=${apiKey.apikey}&q=${props.coordinate_lat},${props.coordinate_lng}`}>
                                        </iframe>
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
