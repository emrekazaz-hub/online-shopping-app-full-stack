// ShoppingCartPage.js
import { useCart } from '../../CartContext/CartContext';
import './ShoppinCartPage.css';
import Empty from '../WarningPages/Empty';

// Gerekirse stil dosyanızı ekleyin

const ShoppingCartPage = () => {
    const { cartItems, calculateTotalPrice, removeCart, removeItem, confirmCart, handleStepChange } = useCart();

    const handleConfirmCart = () => {
        confirmCart();
        handleStepChange(0);
    }

    return (
        <div>
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <Empty />
            ) : (
                <div>
                    <ul>
                        {
                            cartItems.map((product) => (
                                <div key={product.productid} className="card" style={{ width: '18rem' }}>
                                    <div className="card-img-top">
                                        <img src={product.image_url} class="card-img-top" alt="..."></img>
                                    </div>

                                    <div className="card-body">
                                        <h5>{product.productname}</h5>

                                        <div className="details">
                                            <p className="card-tex">{product.description}</p>
                                        </div>

                                        <div className="price">
                                            <h4>price: {product.price}</h4>
                                        </div>

                                        <div>
                                            <p>quantity : {product.quantity}</p>
                                        </div>

                                        <div>
                                            <button className="btn btn-danger" onClick={() => removeItem(product.productid)}>remove item</button>
                                        </div>

                                        {console.log('cart items : ', cartItems)}

                                    </div>

                                </div>
                            ))
                        }
                    </ul>
                    
                    <div>
                        <h2>total price : {calculateTotalPrice()}</h2>
                    </div>

                    <div>
                        <button className="btn btn-danger" onClick={() => removeCart()}>remove cart</button>
                        <button className="btn btn-success" onClick={handleConfirmCart}>Make the payment</button>
                    </div>

                </div>
            )}



        </div>
    );
};

export default ShoppingCartPage;
