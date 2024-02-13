import React, { useState } from 'react';
import './Navbar.css';
import logo from './logo2.jpg';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {

    const { cartItems, handleNavigate, isSignedIn, updateSignInStatus } = useCart();

    // calculate the total quantity of items in the cart
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    const handleClickLogout = (props) => {
        if (isSignedIn) {
            console.log('giris yapildi mi ', isSignedIn);
            updateSignInStatus(props);
        }
        handleNavigate('/login2');
    }

    return (
        <div>
            <ToastContainer/>
            <nav className='navbar'>
                <div className='right-side'>
                    <img src={logo} className='logo' onClick={() => handleNavigate('/')} alt="logo"></img>
                    <ul className='ul-list'>
                        <li>
                            <a className='products-tag' href="#">Products</a>
                            <ul className='ul-list2'>
                                <li><a href="#">Link 1</a></li>
                                <li><a href="#">Link 2</a></li>
                                <li><a href="#">Link 3</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <div className='middle search'>
                    <input className='search-box' type='search' placeholder='search'></input>
                    <i className="btn bi-search search-icon"></i>
                </div>

                <div className='right-side'>
                    { /*<i className="btn bi-box-arrow-in-right login-color" onClick={() => handleNavigate('/login')}></i> */}
                    <i className="btn bi-box-arrow-in-right login-color" title='signin/signout' onClick={handleClickLogout}></i>
                    <i class="btn login-color bi-person-circle" title='profile' onClick={() => handleNavigate('/profilePage')}></i>
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
