import React, { useRef, useEffect, useState } from "react";
import './Section1.css';
import ScrollFadeAnimation from "../ScrollFadeAnimation/ScrollFadeAnimation";
import Nike from '../../../../Images/nikeImages/nikeWhiteHyper.jpg';
import Nike2 from '../../../../Images/nikeImages/nikeWhiteHyper2.jpg';


const Section1 = () => {

    const [isVisible, setIsVisible] = useState();

    const myRef = useRef();
    console.log('isVible: ', isVisible)
    useEffect(() => {
        console.log('myref : ', myRef.current);
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            setIsVisible(entry.isIntersecting)
        });

        const nikeImageAnimation = document.querySelector('.image-animate-for-nike');
        if (nikeImageAnimation) {
            observer.observe(nikeImageAnimation);
        }

        return () => {
            observer.unobserve(nikeImageAnimation);
        };
    }, [])

    return (
        <div>
            <section className="section1">
                <div className="animation-box">

                    <h2 className="nike-header">Nike</h2>

                    <div>
                        <img src={Nike2} className={`img-before ${isVisible ? 'img-after-nike' : ''}`}></img>
                    </div>

                </div>

                <div className="image-animate-for-nike"></div>
            </section>

        </div>
    );
}

export default Section1;
