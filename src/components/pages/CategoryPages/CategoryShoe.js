import React, { useState, useEffect } from "react";
import { useCart } from "../../CartContext/CartContext";
import CategoryPage from "./CategoryPage";

const CategoryShoe = () => {
    return (
        <div>
            <h2>category page of : Shoe</h2>
            <div>
                <CategoryPage />
            </div>
        </div>
    );

}

export default CategoryShoe;