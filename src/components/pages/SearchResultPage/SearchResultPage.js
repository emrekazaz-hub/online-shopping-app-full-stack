import React from "react";
import './SearchResultPage.css';
import { useCart } from "../../CartContext/CartContext";

const SearchResultPage = () => {

    const { addToCart, setAddFavori, favorites, searchedProducts } = useCart();

    const handleBuyClick = (product) => {
        addToCart({ ...product, quantity: 1 });
    };

    const handleAddToFavorites = (product) => {
        setAddFavori(product);
    };

    return (
        <div>
            <div className="card-div" style={{ gap: '2rem', padding: '5rem' }}>
                {searchedProducts.map((product) => (
                    <div key={product.productid} className="card" style={{ width: '18rem' }}>
                        <div className="card-img-top">
                            <img src={product.image_url} className="card-img-top" alt="..."></img>
                        </div>

                        <div className="card-body">
                            <h5>{product.productname}</h5>

                            <div className="details">
                                <p className="card-text">{product.description}</p>
                            </div>

                            <div className="price">
                                <h4>price: ${product.price}</h4>
                            </div>

                            <div className="button-card">
                                <button onClick={() => handleBuyClick(product)} className="btn btn-primary">Buy</button>
                                <i
                                    onClick={() => handleAddToFavorites(product)}
                                    className={`btn bi-heart heart-cover ${(favorites.some((fav) => fav.productid === product.productid && fav.favColor)) ? 'heart-color-change' : ''}`}
                                ></i>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchResultPage;