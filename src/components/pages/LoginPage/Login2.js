import './Login.css';
import React, { useState, useEffect } from "react";
import { useCart } from "../../CartContext/CartContext";
import { usersDb } from "../../Database/Database";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login2 = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isCheckBoxSelected, setIsCheckBoxSelected] = useState(false);
    const notify = () => toast();

    const { handleNavigate, findSignedUser, isSignedIn, handleSignIn, handleSignUp } = useCart();

    // db signin
    const handleSigninButton = (e) => {
        e.preventDefault();

        handleSignIn(email, password);
    }

    const handleSignUpButton = (e) => {
        e.preventDefault();

        handleSignUp(name, email, password,isCheckBoxSelected);

    }

    const handleSignUpAnimation = () => {
        const container = document.getElementById('container');
        container.classList.add('right-panel-active');
    };

    const handleSignInAnimation = () => {
        const container = document.getElementById('container');
        container.classList.remove('right-panel-active');
    };

    return (
        <div>
            <div>
                <div className="container" id="container">
                    <div className="form-container sign-up-container">
                        <form className="form" action="#">
                            <h1>Create Account</h1>
                            <div className="social-container">
                                <a href="#" className="social"><i className="bi bi-google"></i></a>
                                <a href="#" className="social"><i className="bi bi-twitter-x"></i></a>
                                <a href="#" className="social"><i className="bi bi-apple"></i></a>
                            </div>
                            <span>or use your email for registration</span>
                            <input className="input" type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                            <input className="input" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                            <input className="input" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            <div className='checkbox-role-group'>
                                <h2 className='checkbox-role-h2'>I'm going to sell</h2>
                                <input className='checkbox-role' type='checkbox' onClick={(e) => setIsCheckBoxSelected(e.target.checked)}></input>
                            </div>
                            
                            { /* <button className="butn" onClick={handleSignUp}>Sign Up</button> */}
                            <button className="butn" onClick={handleSignUpButton}>Sign Up</button>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form className="form " action="#">
                            <h1>Sign in</h1>
                            <div className="social-container">
                                <a href="#" className="social"><i className="bi bi-google"></i></a>
                                <a href="#" className="social"><i className="bi bi-twitter-x"></i></a>
                                <a href="#" className="social"><i className="bi bi-apple"></i></a>
                            </div>
                            <span>or use your account</span>
                            <input className="input" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                            <input className="input" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            <a href="#">Forgot your password?</a>
                            {/*<button className="butn" onClick={() => handleLogin({ userEmail: email, userPassword: password })}>Sign In</button>*/}
                            <button className="butn tooltip-button" onClick={handleSigninButton} title='sign in'>Sign In 2</button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p>To keep connected with us, please login with your personal info</p>
                                <button className="ghost butn" onClick={handleSignInAnimation}>Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p>Enter your personal details and start the journey with us</p>
                                <button className="ghost butn" onClick={handleSignUpAnimation} title='sign up'>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>

                <footer>
                    <p>
                        Created with <i className="fa fa-heart"></i> by
                        <a target="_blank" href="https://florin-pop.com"> WooX </a>
                        - Contact with us for further steps in
                        <a target="_blank" href="https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/"> here</a>.
                        <a target='blank'></a>
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default Login2;


