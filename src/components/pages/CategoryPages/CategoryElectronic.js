import React, {useState, useEffect} from "react";
import { useCart } from "../../CartContext/CartContext";
import CategoryPage from "./CategoryPage";

const CategoryElectronic = () => {

    const { listOfCategory } = useCart();

    return (
        <div>
            <h2>category page of : Electronic</h2>
            <div>
                <CategoryPage />
            </div>
        </div>
    );
}

export default CategoryElectronic;