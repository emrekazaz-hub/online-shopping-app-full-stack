import React, { useEffect, useState } from "react";
import { useCart } from "../../../../CartContext/CartContext";
import Pagination from "../../Pagination/Pagination";
import './PaginationAddress.css';

const PaginationAdress = () => {
    const [items,setItems] = useState([]);
    const { handleStepChange, handleNavigate, signedUserAdress, signedUser, getUserAdress, cartItems, addToPurchasedProductList } = useCart();

    const [productName, setProductName] = useState();
    const [productPrice, setProductPrice] = useState();
    const [productQuantity, setProductQuantity] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
    const [sellerId, setSellerId] = useState();

    const handleApproveClick = () => {
        addToPurchasedProductList(sellerId, productName, productPrice, productQuantity, selectedCategory);
        handleStepChange(3);
        handleNavigate('/paginationSuccess');
    }

    const handleBackClick = () => {
        handleStepChange(1);
        handleNavigate('/paginationCard');
    }

    useEffect(() => {
        getUserAdress();
        cartItems.map((item) => (
            console.log(item),
            setSellerId(item.userid),
            setProductName(item.productname),
            setProductPrice(item.price),
            setProductQuantity(item.quantity),
            setSelectedCategory(item.category_name)
        ))
    }, [])

    return (
        <div>
            <h2>pagination Address page</h2>
            <div>
                <Pagination />
                <div className="pagination-adress-main-div">

                    {signedUserAdress.map((adres, index) => (
                        <div key={index} className="index-adres">
                            <h2>{index + 1} adres</h2>
                            <h2>username : {signedUser.username}</h2>
                            <p>address : {adres.adress}</p>
                            <p>address 2 : {adres.adres2}</p>
                            <p>city : {adres.city}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className='butn-group-payment'>
                <button className='btn btn-success' onClick={handleApproveClick}>Approve Items</button>
                <button className='btn btn-dark' onClick={handleBackClick}>Go Back</button>
            </div>

        </div>
    );
}

export default PaginationAdress;