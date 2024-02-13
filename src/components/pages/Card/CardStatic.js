import React, { useState, useEffect } from "react";
import fetchProducts from "../../Products/ProductCard/ProductCard";
import './CardStatic.css';
import { useCart } from "../../CartContext/CartContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CardStatic = () => {
    const { addToCart, setAddFavori, favorites } = useCart();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(fetchProducts());
    }, []);

    const handleBuyClick = (product) => {
        addToCart({ ...product, quantity: 1 });
    };

    const handleAddToFavorites = (product) => {
        setAddFavori(product);
    };

    return (
        <div className="card-static-body">
            <section className="card-list">
                <div>
                    <ToastContainer />
                    <div className="card-div" style={{ gap: '2rem', padding: '5rem' }}>
                        {products.map((product) => (
                            <div key={product.productId} className="card" style={{ width: '18rem' }}>
                                <div className="card-img-top">
                                    <img src={product.productImage} className="card-img-top" alt="..."></img>
                                </div>

                                <div className="card-body">
                                    <h5>{product.productName}</h5>

                                    <div className="details">
                                        <p className="card-text">{product.productDetails}</p>
                                    </div>

                                    <div className="price">
                                        <h4>price: {product.productPrice}</h4>
                                    </div>

                                    <div className="button-card">
                                        <button onClick={() => handleBuyClick(product)} className="btn btn-primary">Buy</button>
                                        <i
                                            onClick={() => handleAddToFavorites(product)}
                                            className={`btn bi-heart heart-cover ${(favorites.some((fav) => fav.productId === product.productId && fav.favColor)) ? 'heart-color-change' : ''}`}
                                        ></i>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CardStatic;
