import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./HomePage/HomePage";
import Login from "./LoginPage/Login";
import Navbar from "../Navigation/Navbar";
import NavbarBootstrap from '../Navigation/NavbarBootstrap';
import { CartProvider } from '../CartContext/CartContext';
import ShoppingCartPage from './ShoppingCartPage/ShoppingCartPage';
import Favori from './Favori/Favori';
import Login2 from './LoginPage/Login2';
import PaymentCardPage from './PaymentPage/PaymentCardPage/PaymentCardPage';
import ProfilePage from './ProfilePage/ProfilePage';
import UserAdress from './ProfilePage/UserAdress/UserAdress';
import UserPaymentInfo from './ProfilePage/UserPaymentInfo/UserPaymentInfo';
import UserPreviousOrder from './ProfilePage/UserPreviousOrders/UserPreviousOrders';
import ExistingPaymentCard from './ProfilePage/UserPaymentInfo/ExistingPaymentCard';

const RootPage = () => {
    return (
        <Router>
            <CartProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path='/favori' element={<Favori />} />
                    <Route path='/shoppingcart' element={<ShoppingCartPage />} />
                    <Route path='/login2' element={<Login2 />} />
                    <Route path='/paymentCard' element={<PaymentCardPage />} />
                    <Route path='/profilePage' element={<ProfilePage />} />
                    <Route path='/userAdress' element={<UserAdress />} />
                    <Route path='/userPayment' element={<UserPaymentInfo />} />
                    <Route path='/userPreviousOrder' element={<UserPreviousOrder />} />
                    <Route path='/existingPaymentCard' element={<ExistingPaymentCard />} />
                </Routes>
            </CartProvider>
        </Router>
    );
}

export default RootPage;
