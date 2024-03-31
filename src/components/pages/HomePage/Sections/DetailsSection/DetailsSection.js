import React, { useState, useEffect } from "react";
import { useCart } from "../../../../CartContext/CartContext";
import './DetailsSection.css';

const DetailsSection = () => {

    const [isVisible, setIsVisible] = useState();
    const { cartItems } = useCart();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            setIsVisible(entry.isIntersecting);
        })

        const animateDetails = document.querySelector('.before');
        if (animateDetails) {
            observer.observe(animateDetails)
        }

        return () => {
            observer.unobserve(animateDetails);
        }

    }, [])

    useEffect(() => {
        const valueDisplays = document.querySelectorAll(".num");
        const interval = 5000;

        valueDisplays.forEach((valueDisplay) => {
            let startValue = 0;
            const endValue = parseInt(valueDisplay.getAttribute("data-val"));
            const duration = Math.floor(interval / endValue);
            const counter = setInterval(function () {
                startValue += 1;
                valueDisplay.textContent = startValue;
                if (startValue == endValue) {
                    clearInterval(counter);
                }
            }, duration);
        });

    }, [isVisible])

    return (
        <div>
            <section className="section-details">

                <h2 className="detail-header">Market Reflection</h2>

                <div className={`details-div before ${isVisible ? 'after' : ''}`}>
                    <div className="detail">
                        <i class="bi bi-people icon-detail"></i>
                        <h2>Number of Users</h2>
                        <div className="detail-p-tags">
                            <p>+</p>
                            <p className="num" data-val="500"></p>
                        </div>
                    </div>

                    <div className="detail">
                        <i class="bi bi-truck icon-detail"></i>
                        <h2>Number of Sellers</h2>
                        <div className="detail-p-tags">
                            <p>+</p>
                            <p className="num" data-val="30"></p>
                        </div>
                    </div>

                    <div className="detail">
                        <i class="bi bi-box icon-detail"></i>
                        <h2>Number of Products</h2>
                        <div className="detail-p-tags">
                            <p>+</p>
                            <p className="num" data-val="1350"></p>
                        </div>
                    </div>

                </div>

            </section>
        </div>
    );
}

export default DetailsSection;