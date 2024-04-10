import React, { useState, useContext, useEffect } from "react";
import PlacesAutocomplete from 'react-places-autocomplete';
import {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

import './UserAdress.css';
import { useCart } from "../../../CartContext/CartContext";

const GoogleApi = () => {
    
    const { googleApiToDatabase, getLocationForMap, setCoordinates } = useCart();
    
    const [address, setAddress] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userZip, setUserZip] = useState('');
    const [userBuildingNo, setUserBuildingNo] = useState('');
    const [userFoor, setUserFoor] = useState('');
    const [userApartmentNo, setUserApartmentNo] = useState('');
    const [userAdressDirection, setUserAdressDirection] = useState('');
    const [koordinatlar, setKoordinatlar] = useState([]);
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [mapDrawn, setMapDrawn] = useState(false);

    const handleChange = (address) => {
        setAddress(address);
    };

    const handleSelect = (address) => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                console.log('Success', latLng);
                setKoordinatlar(prevKoordinatlar => [...prevKoordinatlar, latLng]);
                setLat(latLng.lat);
                setLng(latLng.lng);
            })
            .catch(error => console.error('Error', error));
        setAddress(address);
    };

    const drawMap = (e) => {
        e.preventDefault();
        initMap();
        setMapDrawn(true); // Harita çizildi olarak işaretle
    };

    const initMap = () => {
        const { google } = window; // google değişkenini al

        if (google && koordinatlar.length > 0) {
            const map = new google.maps.Map(document.getElementById("map"), {
                center: koordinatlar[0],
                zoom: 14,
            });

            koordinatlar.forEach(koordinat => {
                new google.maps.Marker({
                    position: koordinat,
                    map: map,
                });
            });
        }
    };

    const handleAddAdressWithAPI = (e) => {
        e.preventDefault();
        googleApiToDatabase(
            address,
            userEmail,
            userName,
            userPhone,
            userZip,
            userBuildingNo,
            userFoor,
            userApartmentNo,
            userAdressDirection,
            lat,
            lng
        );

        console.log('gonderdigim lat ve lng : ', lat, lng)
    };

    return (
        <div className="adress-div-google-maps">
            <form className="adress-from-google-maps">
                <PlacesAutocomplete
                    value={address}
                    onChange={handleChange}
                    onSelect={handleSelect}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <label htmlFor="inputEmail4" className="form-label">Adress</label><br />
                            <input
                                {...getInputProps({
                                    placeholder: 'Search Places ...',
                                    className: 'location-search-input',
                                    className: 'form-control-google-maps',
                                })}
                            />
                            <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                        ? { backgroundColor: '#C4C4C5', cursor: 'pointer' }
                                        : { backgroundColor: '#F4F4F5', cursor: 'pointer' };
                                    return (
                                        <div
                                            {...getSuggestionItemProps(suggestion, {
                                                className,
                                                style,
                                            })}
                                        >
                                            <span>{suggestion.description}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>


                <div className="input-group-google-maps">
                    <label htmlFor="inputEmail" className="form-label">Email</label>
                    <input type="email" className="form-control-google-maps" id="inputEmail" placeholder="your email" onChange={(e) => setUserEmail(e.target.value)} />
                </div>
                <div className="input-group-google-maps">
                    <label htmlFor="inputName" className="form-label">Name</label>
                    <input type="text" className="form-control-google-maps" id="inputName" placeholder="your name" onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div className="input-group-google-maps">
                    <label htmlFor="inputPhone" className="form-label">Phone</label>
                    <input type="text" className="form-control-google-maps" id="inputPhone" placeholder="your phone" onChange={(e) => setUserPhone(e.target.value)} />
                </div>
                <div className="input-group-google-maps">
                    <label htmlFor="inputZip" className="form-label">Zip</label>
                    <input type="text" className="form-control-google-maps" id="inputZip" placeholder="your zip code" onChange={(e) => setUserZip(e.target.value)} />
                </div>
                <div className="input-group-google-maps">
                    <label htmlFor="inputBuilding" className="form-label">Building No</label>
                    <input type="text" className="form-control-google-maps" id="inputBuilding" placeholder="your building no" onChange={(e) => setUserBuildingNo(e.target.value)} />
                </div>
                <div className="input-group-google-maps">
                    <label htmlFor="inputFloor" className="form-label">Floor</label>
                    <input type="text" className="form-control-google-maps" id="inputFloor" placeholder="your floor no" onChange={(e) => setUserFoor(e.target.value)} />
                </div>
                <div className="input-group-google-maps">
                    <label htmlFor="inputApartment" className="form-label">Apartment No</label>
                    <input type="text" className="form-control-google-maps" id="inputApartment" placeholder="your apartment no" onChange={(e) => setUserApartmentNo(e.target.value)} />
                </div>
                <div className="input-group-google-maps">
                    <label htmlFor="inputDirection" className="form-label">Adres Tarif</label>
                    <input type="text" className="form-control-google-maps" id="inputDirection" placeholder="adress direction" onChange={(e) => setUserAdressDirection(e.target.value)} />
                </div>

                <div className="button-group-google-maps">
                    {/* Haritayı çizmek için buton */}
                    <button className="btn btn-dark" onClick={drawMap} disabled={mapDrawn}>Get Location</button>
                    <button className="btn btn-success" onClick={handleAddAdressWithAPI}>Save Adress</button>

                </div>

                {/* Harita burada olacak */}
                <div id="map" style={{ height: "400px", width: "50%" }}></div>

            </form>

        </div>
    );
}

export default GoogleApi;
