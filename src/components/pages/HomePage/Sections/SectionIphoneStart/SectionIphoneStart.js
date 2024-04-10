import './SectionIphoneStart.css';
import React, { useState, useEffect, useReducer } from 'react';
import { useCart } from '../../../../CartContext/CartContext';


const SectionIphoneStart = () => {

    const { handleAllow, allow } = useCart();
    const [isVisible, setIsVisible] = useState();

    useEffect(() => {

    }, [])

    return (
        <div className='SectionIphoneStart-div'>
            <section className='iphone-start-section'>
                
            </section>
        </div>
    );
}

export default SectionIphoneStart;