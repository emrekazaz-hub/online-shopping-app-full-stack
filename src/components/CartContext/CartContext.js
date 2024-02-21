import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    //cart
    const [cartItems, setCartItems] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [favColor, setFavColor] = useState(false);
    const [favToast, setFavToast] = useState(false);

    //signin
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [signedUser, setSignedUser] = useState('');
    const [signedUserAdress, setSignedUserAdress] = useState([]);
    const [isAdressSelected, setIsAdressSelected] = useState();
    const [isAdmin, setIsAdmin] = useState();

    //admin


    const navigate = useNavigate();
    const handleNavigate = (url) => {
        navigate(url);
    }

    // ##########################################################################################################################################
    //                                         LOGIN SECTION START
    // ##########################################################################################################################################
    const updateSignInStatus = (props) => {
        setIsSignedIn(false);
        toast(`see you soon ${signedUser.name}`);
    }

    // db signin
    const handleSignIn = (email, password) => {
        fetch('http://localhost:3000/login/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userEmail: email,
                userPassword: password
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    toast(`welcome back ${data.user.name}`);
                    handleNavigate('/');
                    console.log('logged user data', data);
                    setSignedUser(data.user);
                    setIsSignedIn(true);
                    setIsAdmin(data.user.role);
                }
                else if (!email || !password) {
                    alert('please fill all fields');
                    return;
                }

                else if (data.status === 'error') {
                    alert('wrong email or password');
                    return;
                }
            })
    }

    // db signup
    const handleSignUp = (name, email, password, isCheckBoxSelected) => {
        fetch('http://localhost:3000/login/signup', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userName: name,
                userEmail: email,
                userPassword: password,
                isCheckBoxSelected
            })

        })
            .then(res => res.json())
            .then(data => {

                if (data.status === 'existingUser') {
                    alert('user already exists !');
                }

                else if (!name || !email || !password) {
                    alert('please fill all fields');
                }

                else if (data.status === 'addUser') {
                    console.log('kullanici eklendi');
                    toast(`welcome back ${data.user.name}`);
                    setSignedUser(data.user);
                    setIsSignedIn(true);
                    handleNavigate('/');
                    setIsAdmin(data.user.role);
                }
            })
    }

    // ##########################################################################################################################################
    //                                         LOGIN SECTION END
    // ##########################################################################################################################################


    // ##########################################################################################################################################
    //                                         CARD SECTION START
    // ##########################################################################################################################################
    // db card fetch
    const fetchCardInformation = () => {
        let userId = signedUser.id;
        handleNavigate('/userPayment');
        fetch(`http://localhost:3000/cardpayment/${userId}`)
            .then(res => res.json())
            .then(data => {
                // Kart bilgilerini almak için yapılan işlemler
                console.log('Card information:', data);
                if (data.status === 'cardfalse') {
                    console.log('user has no card !!!');
                    return;
                }

                else if (data.status === 'cardtrue') {
                    console.log('user has card');
                    handleNavigate('/existingPaymentCard');
                }
            })
            .catch(error => console.error('Error fetching card information:', error));
    }

    //add card
    const addPaymentCard = (cardName, cardNumber, cardMonth, cardYear, cardCvv) => {
        if (!isSignedIn) {
            alert('please login first');
        }
        const userId = signedUser.id;
        fetch(`http://localhost:3000/profile/cardpayment-new/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userCardName: cardName,
                userCardNumber: cardNumber,
                userCardMonth: cardMonth,
                userCardYear: cardYear,
                userCardCvv: cardCvv,
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.status === 'addnewcard') {
                    console.log('kart eklendi');
                    return;
                }
                if (data.status === 'erraddcard') {
                    console.log('kart eklerken bir hata olustu');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    // delete card
    const deletePaymentCard = () => {
        let userId = signedUser.id;
        fetch(`http://localhost:3000/cardpaymentdelete/${userId}`)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success-delete') {
                    console.log('Your card has been successfully deleted');
                    toast('Your card has been successfully deleted');
                } else {
                    console.log('cannot delete the card');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        handleNavigate('/userPayment');
    }

    // ##########################################################################################################################################
    //                                         CARD SECTION END
    // ##########################################################################################################################################


    // ##########################################################################################################################################
    //                                         ADRESS SECTION START
    // ##########################################################################################################################################
    // db get adress
    const getUserAdress = () => {
        let userId = signedUser.id;
        fetch(`http://localhost:3000/profile/adress/${userId}`)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'adressGet') {
                    console.log('Logged Users Adress : ', data.userAdress);
                    handleNavigate('/existingAdress');
                    setSignedUserAdress(data.userAdress);
                } else if (data.status === 'noAdressFound') {
                    console.log('user has no adres');
                    handleNavigate('/userAdress');
                } else if (!isSignedIn) {
                    handleNavigate('/userAdress');
                }
            })
            .catch(err => {
                console.log('fetch isleminde sorun oldu : ', err);
            });
    }


    // db fetchAdress
    const addAdressToDatabase = (userEmail, userAdress, userAdress2, userCity, userAdressState, userZip) => {
        let userId = signedUser.id;

        fetch(`http://localhost:3000/profile/adress-new/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
                userEmail,
                userAdress,
                userAdress2,
                userCity,
                userAdressState,
                userZip
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'adress-success') {
                    console.log('adres eklendi :');
                    toast.success('your adres added successfuly');
                    handleNavigate('/existingAdress');
                } else {
                    console.log('cannot add the adress');
                    toast.error('can not add the adress');
                }
            })
    }

    const handleAddNewAdress = () => {
        handleNavigate('/userAdress');
    }

    // ##########################################################################################################################################
    //                                         ADMiN SECTION END
    // ##########################################################################################################################################


    // ##########################################################################################################################################
    //                                         ADMiN SECTION START
    // ##########################################################################################################################################

    const addProduct = () => {

    }

    const deleteProduct = () => {

    }

    const getProducts = () => {

    }

    const getPurchasedProductList = () => {

    }

    // ##########################################################################################################################################
    //                                         ADMiN SECTION End
    // ##########################################################################################################################################


    
    // ##########################################################################################################################################
    //                                         SEARCH SECTION Start
    // ##########################################################################################################################################

    const searchProductFromDb = () => {

    }
    
    // ##########################################################################################################################################
    //                                         SEARCH SECTION End
    // ##########################################################################################################################################


    // ##########################################################################################################################################
    //                                         CART SECTION START
    // ##########################################################################################################################################
    // Örnek addToCart fonksiyonu
    const addToCart = (product) => {
        const productExist = cartItems.find((item) => item.productId === product.productId);
        toast('added to cart');
        if (productExist) {
            setCartItems(
                cartItems.map((item) =>
                    item.productId === product.productId
                        ? { ...productExist, quantity: productExist.quantity + 1 }
                        : item
                )
            );
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
        // ilk calisir hali :
        //     setCartItems((prevCartItems) => [...prevCartItems, product]);
    };

    const removeCart = () => {
        setCartItems([]);
    };

    const removeItem = (productId) => {
        setCartItems(cartItems.filter((item) => item.productId !== productId));
    };

    const confirmCart = () => {
        handleNavigate('/paymentCard');
    };

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        cartItems.forEach((item) => {
            totalPrice += item.productPrice * item.quantity;
        });
        return totalPrice;
    };



    const setAddFavori = (product) => {
        const isAlreadyFavorited = favorites.some((fav) => fav.productId === product.productId);

        if (isAlreadyFavorited) {
            setFavorites(favorites.filter((item) => item.productId !== product.productId, [{ favColor: false }]));
            setFavToast(true);
            if (setFavToast) {
                toast('removed from favorites');
            }
            return;
        }

        if (!isAlreadyFavorited) {
            setFavorites((prevFavorites) => [...prevFavorites, { ...product, favColor: true }]);
            toast('added to favorites');
        }
    };

    // ##########################################################################################################################################
    //                                         CART SECTION END
    // ##########################################################################################################################################



    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            calculateTotalPrice,
            removeCart,
            handleNavigate,
            removeItem,
            confirmCart,
            favorites,
            setAddFavori,
            isSignedIn,
            signedUser,
            updateSignInStatus,
            handleSignIn,
            handleSignUp,
            fetchCardInformation,
            deletePaymentCard,
            addPaymentCard,
            getUserAdress,
            addAdressToDatabase,
            signedUserAdress,
            handleAddNewAdress,
            isAdressSelected,
            isAdmin,

        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
