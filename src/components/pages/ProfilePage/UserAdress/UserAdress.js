import ProfilePage from "../ProfilePage";
import './UserAdress.css';
import '../ProfilePage.css';
import React, { useState, useEffect } from "react";
import { useCart } from "../../../CartContext/CartContext";

const UserAdress = () => {

    const { signedUser, handleNavigate, addAdressToDatabase } = useCart();

    const [userEmail, setUserEmail] = useState('');
    const [userAdress, setUserAdress] = useState('');
    const [userAdress2, setuserAdress2] = useState('');
    const [userCity, setUserCity] = useState('');
    const [userAdressState, setUserAdressState] = useState('');
    const [userZip, setUserZip] = useState('');

    const handleAdressSubmitButton = (e) => {
        e.preventDefault();
        addAdressToDatabase(userEmail, userAdress, userAdress2, userCity, userAdressState, userZip);
    }

    return (
        <div className="main-div-adress">
            <ProfilePage />

            <div className="card">
                <form className="row g-3 adress-form">
                    <div className="col-md-6">
                        <label htmlFor="inputEmail4" className="form-label">Email</label>
                        <input type="email" className="form-control" id="inputEmail4" onChange={(e) => setUserEmail(e.target.value)} />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label">Address</label>
                        <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" onChange={(e) => setUserAdress(e.target.value)} />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputAddress2" className="form-label">Address 2</label>
                        <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" onChange={(e) => setuserAdress2(e.target.value)} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputCity" className="form-label">City</label>
                        <input type="text" className="form-control" id="inputCity" placeholder="City will be retrieved via google api" onChange={(e) => setUserCity(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="inputState" className="form-label">State</label>
                        <select id="inputState" className="form-select" onInput={(e) => setUserAdressState(e.target.value)}>
                            <option selected>Choose...</option>
                            <option>We are going to fill</option>
                            <option>This parts with</option>
                            <option>Google API</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="inputZip" className="form-label">Zip</label>
                        <input type="text" className="form-control" id="inputZip" onChange={(e) => setUserZip(e.target.value)} />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary" onClick={handleAdressSubmitButton}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserAdress;
