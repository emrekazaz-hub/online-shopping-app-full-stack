import React, { useState, useEffect } from "react";
import { useCart } from "../../CartContext/CartContext";
import { usersDb } from "../../Database/Database";
import HomePage from "../HomePage/HomePage";

const Login = () => {

    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { handleNavigate } = useCart();

    // link for login design
    // https://codepen.io/FlorinPop17/pen/vPKWjd
    
    const handleLogin = () => {
        const loggedUser = usersDb.find((user) => user.userEmail === email && user.userPassword === password);
        if (loggedUser) {
            handleNavigate('/');
            alert(`Welcome, ${loggedUser.userName}`);
        } else {
            alert('No user found');
        }
    };

    return (
        <div>
            <div className='from-div'>
                <form>
                    <input type='email' placeholder='email' onChange={(e) => setEmail(e.target.value)}></input>
                    <input className='password' type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)}></input>
                    <button className='login-button' onClick={() => handleLogin({ userEmail: email, userPassword: password })}>login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;