import React, { useState, useEffect } from "react";
import { useCart } from "../../CartContext/CartContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Favori.css';

const Favori = () => {
    const { favorites, removeItem } = useCart();
    const { setAddFavori, addToCart } = useCart();

    const handleAddToFavotires = (product) => {
        setAddFavori({ ...product, favColor: false });
    };

    const handleBuyClick = (product) => {
        addToCart({ ...product, quantity: 1 }); // 1 can be replaced with the desired quantity
    };


    return (
        <div>
            <ToastContainer />
            <h2>Favorites</h2>
            {favorites.length === 0 ? (
                <p>Your favorites is empty.</p>
            ) : (
                <ul>
                    {favorites.map((product) => (
                        <div key={product.productId} className="card" style={{ width: '18rem' }}>
                            <div className="card-img-top">
                                <img src={product.image_url} className="card-img-top" alt="..."></img>
                            </div>

                            <div className="card-body">
                                <h5>{product.productname}</h5>

                                <div className="details">
                                    <p className="card-tex">Details : {product.description}</p>
                                </div>

                                <div className="price">
                                    <h4>price: {product.price}</h4>
                                </div>

                                <div>
                                <button onClick={() => handleBuyClick(product)} href="#" className="btn btn-primary">Buy</button>
                                    <i
                                        onClick={() => handleAddToFavotires(product)}
                                        className={`btn bi-heart heart-cover ${(product.favColor === true) ? 'heart-color-change' : ''}`} >
                                        {console.log(product.favColor)}
                                    </i>
                                </div>

                            </div>
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Favori;
