import React, {useState, useEffect} from "react";
import { useCart } from "../../CartContext/CartContext";

const ProductPage = () => {

    const { products } = useCart();

    return(
        <div>
            <button onClick={console.log(products)}>log products</button>
        </div>
    );
}

export default ProductPage;