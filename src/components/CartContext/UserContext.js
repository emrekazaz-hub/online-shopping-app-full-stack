import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);

    const login = () => {
        users.map()
    }

    return (
        <CartContext.Provider value={{ users, login }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
