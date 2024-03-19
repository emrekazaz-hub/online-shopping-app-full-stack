import React, { useEffect, useState } from 'react';
import './Navbar.css';
import logo from './logo2.jpg';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {

    const { cartItems, handleNavigate, isSignedIn, updateSignInStatus, isAdmin, resetSignedUserInfo, searchProductFromDb } = useCart();
    const [searchboxitem, setSearchBoxItem] = useState([]);

    // calculate the total quantity of items in the cart
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    useEffect(() => {
        resetSignedUserInfo()
    }, [isSignedIn])

    const handleClickLogout = (props) => {
        if (isSignedIn) {
            updateSignInStatus(props);
        }
        handleNavigate('/login2');
    }

    const handleNavigateUserByRole = () => {
        if (isAdmin === true) {
            handleNavigate('/adminPage')
        } else {
            handleNavigate('/profilePage');
        }
    }

    const handleSearchButtonClick = () => {
        if (searchboxitem.length === 0) {
            return;
        }else{
            searchProductFromDb(searchboxitem);
        }
        
    }

    return (
        <div>
            <ToastContainer />
            <nav className='navbar'>
                <div className='right-side'>
                    <img src={logo} className='logo' onClick={() => handleNavigate('/')} alt="logo"></img>
                    <ul className='ul-list'>
                        <li>
                            <a className='products-tag' href="#">Products</a>
                            <ul className='ul-list2'>
                                <li><a className='a-tag' href="#">Electronic</a></li>
                                <li><a className='a-tag' href="#">Clothes</a></li>
                                <li><a className='a-tag' href="#">Shoe</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <div className='middle search'>
                    <input className='search-box' type='search' placeholder='search' onChange={(e) => setSearchBoxItem(e.target.value)}></input>
                    <i className="btn bi-search search-icon" onClick={handleSearchButtonClick}></i>
                </div>

                <div className='right-side'>
                    { /*<i className="btn bi-box-arrow-in-right login-color" onClick={() => handleNavigate('/login')}></i> */}
                    <button onClick={() => handleNavigate('/gsapCard')}>go to aminate gsap</button>
                    <i className="btn bi-box-arrow-in-right login-color" title='signin/signout' onClick={handleClickLogout}></i>
                    <i class="btn login-color bi-person-circle" title='profile' onClick={handleNavigateUserByRole}></i>
                    <i className="btn bi-heart login-color" title='favorites' onClick={() => handleNavigate('/favori')}></i>
                    <i className="btn bi-cart4 login-color" title='cart' onClick={() => handleNavigate('/shoppingcart')}>
                        {totalQuantity > 0 && <span className="cart-quantity">{totalQuantity}</span>}
                    </i>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
