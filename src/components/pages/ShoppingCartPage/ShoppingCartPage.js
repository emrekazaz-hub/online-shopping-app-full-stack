// ShoppingCartPage.js
import { useCart } from '../../CartContext/CartContext';
import './ShoppinCartPage.css';

// Gerekirse stil dosyanızı ekleyin

const ShoppingCartPage = () => {
    const { cartItems, calculateTotalPrice, removeCart, removeItem, confirmCart } = useCart();

    return (
        <div>
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {
                        cartItems.map((product) => (
                            <div key={product.productId} className="card" style={{ width: '18rem' }}>
                                <div className="card-img-top">
                                    <img src={product.productImage} class="card-img-top" alt="..."></img>
                                </div>

                                <div className="card-body">
                                    <h5>{product.productName}</h5>

                                    <div className="details">
                                        <p className="card-tex">{product.productDetails}</p>
                                    </div>

                                    <div className="price">
                                        <h4>price: {product.productPrice}</h4>
                                    </div>
                                    
                                    <div>
                                        <p>quantity : {product.quantity}</p>
                                    </div>

                                    <div>
                                        <button className="btn btn-danger" onClick={() => removeItem(product.productId)}>remove item</button>
                                    </div>

                                </div>

                            </div>
                        ))
                    }
                </ul>
            )}

            <div>
                <h2>total price : {calculateTotalPrice()}</h2>
            </div>

            <div>
                <button className="btn btn-danger" onClick={() => removeCart()}>remove cart</button>
                <button className="btn btn-success" onClick={() => confirmCart()}>Continue to payment</button>
            </div>

        </div>
    );
};

export default ShoppingCartPage;
