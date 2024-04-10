import React, { useEffect, useState } from "react"
import { useCart } from "../../../CartContext/CartContext"


const Deneme = () => {

    const { coordinates } = useCart();

    return (
        <div>
            {coordinates.map((cordinat, index) => {
                return (
                    <div key={index}>
                        <p>{cordinat.lat}</p>
                    </div>
                )
            })}
        </div>
    );
}

export default Deneme;