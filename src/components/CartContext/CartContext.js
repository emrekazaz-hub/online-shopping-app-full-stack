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
    const [signedUserCard, setSignedUserCard] = useState([]);

    //admin
    const [products, setProducts] = useState([]);
    const [purchasedProducts, setPurchasedProducts] = useState([]);

    // payment
    const [step, setStep] = useState();
    const [cartTotalPrice, setCartTotalPrice] = useState(0);

    // search
    const [searchedProducts, setSearchedProducts] = useState([]);

    // photos for carosel
    const [photos, setPhotos] = useState([]);
    const [allow, setAllow] = useState(false);

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

    const resetSignedUserInfo = () => {
        if (signedUser && isSignedIn) {
            setSignedUserAdress([]);
            setSignedUserCard([])
        }
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
        console.log(userId);
        fetch(`http://localhost:3000/cardpayment/${userId}`)
            .then(res => res.json())
            .then(data => {
                // Kart bilgilerini almak için yapılan işlemler
                if (data.status === 'cardtrue') {
                    setSignedUserCard(data.cardInfo);
                    console.log('kart alindi : ', data.cardInfo)
                }

                else if (data.status === 'cardfalse') {
                    setSignedUserCard(null)
                    console.log('No card Found', data.status)
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
                if (data.status === 'addnewcard') {
                    toast.success('your card has been added successfully');
                    toast.info('if you can`t see your card please reclick to your card profile ^^');
                    return;
                }
                if (data.status === 'erraddcard') {
                    toast.error('error while adding card');
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
                    setSignedUserAdress(data.userAdress);
                } else if (data.status === 'noAdressFound') {
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
    //                                         ADRESS SECTION END
    // ##########################################################################################################################################


    // ##########################################################################################################################################
    //                                         ADMiN SECTION START
    // ##########################################################################################################################################

    const addProduct = (productName, productDescription, productPrice, productQuantity, selectedCategory, selectedSubCategory, productImage) => {
        const userId = signedUser.id;
        fetch(`http://localhost:3000/profile/admin/addProduct/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
                productName,
                productDescription,
                productPrice,
                productQuantity,
                selectedCategory,
                selectedSubCategory,
                productImage
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'productAdded') {
                    toast.success('product has been added');
                } else if (data.status === 'productNotAdded') {
                    toast.error('somathing went wrong');
                }
            })

    }

    const deleteProduct = () => {

    }

    const getProducts = () => {
        const userId = signedUser.id;
        fetch(`http://localhost:3000/profile/admin/getProduct/${userId}`)
            .then(res => res.json())
            .then(data => {
                if (data.status === 'getProducts') {
                    setProducts(data.products);
                } else if (data.status === 'cannotGetProducts') {
                    console.log('urunler alinamadi');
                }
            })
    }


    const getProductsForUser = () => {
        const userId = signedUser.id;
        fetch(`http://localhost:3000/profile/getProduct/${userId}`)
            .then(res => res.json())
            .then(data => {
                if (data.status === 'getProducts') {
                    setProducts(data.products);
                } else if (data.status === 'cannotGetProducts') {
                    console.log('urunler alinamadi');
                }
            })
    }

    const getPurchasedProductList = () => {
        const userId = signedUser.id;
        fetch(`http://localhost:3000/profile/admin/purchasedProducts/${userId}`)
            .then(res => res.json())
            .then(data => {
                if (data.status === 'getPurchasedProducts') {
                    console.log('backendden basariyla veri alindi. Alinan veri :', data.purchasedProducts);
                    setPurchasedProducts(data.purchasedProducts);
                } else if (data.status === 'cannotGetPurchasedProducts') {
                    console.log('backedndden veri alinamadi');
                }
            })
    }

    const addToPurchasedProductList = (sellerId, productName, productPrice, productQuantity, selectedCategory) => {
        const userId = signedUser.id;
        const purchasedUser = signedUser.name;
        const purchasedUserEmail = signedUser.email;
        fetch(`http://localhost:3000/profile/admin/purchasedProducts/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
                sellerId,
                purchasedUser,
                purchasedUserEmail,
                productName,
                productPrice,
                productQuantity,
                selectedCategory,
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    console.log('basariyla ekledik', data)
                } else {
                    console.log('ekleyemedik')
                }
            })
            .catch(err => {
                console.log('error', err)
            })

    }

    // ##########################################################################################################################################
    //                                         ADMiN SECTION End
    // ##########################################################################################################################################



    // ##########################################################################################################################################
    //                                         SEARCH SECTION Start
    // ##########################################################################################################################################

    const searchProductFromDb = (searchboxitem) => {
        fetch('http://localhost:3000/search/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               searchboxitem
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                console.log('urunu aldik', data)
                setSearchedProducts(data.product);
                handleNavigate('/searchedItems')
            }else{
                console.log('urunu alamadik')
            }
        })
    }


    const listByCategory = () => {

    }

    const listBySubCategory = () => {

    }

    const openModal = () => {

    }

    const viewProductPage = () => {

    }

    // ##########################################################################################################################################
    //                                         SEARCH SECTION End
    // ##########################################################################################################################################


    // ##########################################################################################################################################
    //                                         Payment SECTION Start
    // ##########################################################################################################################################

    const handleStepChange = (newStep) => {
        setStep(newStep);
    }

    const calculateCardBalance = () => {

    }


    // ##########################################################################################################################################
    //                                         Payment SECTION End
    // ##########################################################################################################################################


    // ##########################################################################################################################################
    //                                         CART SECTION START
    // ##########################################################################################################################################
    // Örnek addToCart fonksiyonu
    const addToCart = (product) => {
        const productExist = cartItems.find((item) => item.productid === product.productid);
        toast('added to cart');
        if (productExist) {
            setCartItems(
                cartItems.map((item) =>
                    item.productid === product.productid
                        ? { ...productExist, quantity: productExist.quantity + 1 }
                        : item
                )
            );
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };

    const removeCart = () => {
        setCartItems([]);
    };

    const removeItem = (productid) => {
        setCartItems(cartItems.filter((item) => item.productid !== productid));
    };

    const confirmCart = () => {
        handleNavigate('/paymentCard');
    };

    const calculateTotalPrice = (qyt) => {
        let totalPrice = 0;
        cartItems.forEach((item) => {
            totalPrice += item.price * item.quantity;
            setCartTotalPrice(totalPrice);
        });
    };



    const setAddFavori = (product) => {
        const isAlreadyFavorited = favorites.some((fav) => fav.productid === product.productid);

        if (isAlreadyFavorited) {
            setFavorites(favorites.filter((item) => item.productid !== product.productid, [{ favColor: false }]));
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





    // ##########################################################################################################################################
    //                                         PHOTOS SECTION START
    // ##########################################################################################################################################
    const fetchPhotos = async () => {
        try {
            const response = await fetch('http://localhost:3000/photos/carosel');
            if (!response.ok) {
                throw new Error('Failed to fetch photos');
            }
            const data = await response.json();
            setPhotos(data);
        } catch (error) {
            console.error('Error fetching photos:', error);
        }
    };


    const handleAllow = () => {
        setAllow(true);
    }
    // ##########################################################################################################################################
    //                                         PHOTOS SECTION END
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
            addProduct,
            products,
            getProducts,
            getProductsForUser,
            getPurchasedProductList,
            purchasedProducts,
            handleStepChange,
            step,
            signedUserCard,
            photos,
            fetchPhotos,
            handleAllow,
            allow,
            cartTotalPrice,
            resetSignedUserInfo,
            addToPurchasedProductList,
            searchProductFromDb,
            searchedProducts,

        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
