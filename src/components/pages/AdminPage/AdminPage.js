import React, { useState } from "react";
import ProfilePage from "../ProfilePage/ProfilePage";
import { useCart } from "../../CartContext/CartContext";

const AdminPage = () => {

    const { isAdmin } = useCart();

    return (
        <div>
            <div>
                <h2>this is admin page</h2>
            </div>
        </div>
    );
}

export default AdminPage;