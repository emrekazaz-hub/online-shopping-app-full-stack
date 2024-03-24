import React, { useState, useEffect } from "react";
import { useCart } from "../../CartContext/CartContext";
import CategoryPage from "./CategoryPage";

const CategoryClothes = () => {

    const { listOfCategory } = useCart();

    return (
        <div>
            <h2>category page of : Clothes</h2>
            <div>
                <CategoryPage />
            </div>
        </div>
    );
}

export default CategoryClothes;