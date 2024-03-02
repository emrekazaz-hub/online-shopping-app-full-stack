import React, { useEffect } from "react";
import { useCart } from "../../../../CartContext/CartContext";
import Pagination from "../../Pagination/Pagination";

const PaginationAdress = () => {

    const { handleStepChange, handleNavigate, signedUserAdress, signedUser, getUserAdress } = useCart();

    const handleApproveClick = () => {
        handleStepChange(3);
        handleNavigate('/paginationSuccess');
    }

    useEffect(() => {
        getUserAdress();
    }, [])

    return (
        <div>
            <h2>pagination Address page</h2>
            <div>
                <Pagination />
                <div>
                    <h2>adres info : </h2>
                    {signedUserAdress.map((adres, index) => (
                        <div key={index}>
                            <h2>{index+1} adres</h2>
                            <h2>username : {signedUser.username}</h2>
                            <p>address : {adres.adress}</p>
                            <p>address 2 : {adres.adres2}</p>
                            <p>city : {adres.city}</p>
                        </div>
                    ))}
                </div>
            </div>

            <button className='btn btn-dark' onClick={handleApproveClick}>Approve Your Address</button>

        </div>
    );
}

export default PaginationAdress;