import React, { useState, useEffect, useRef } from "react"
import { useCart } from "../../../CartContext/CartContext";
import vidCarosel from './vidCarosel.mp4';
import './CaroselVid.css';

const CaroselVid = () => {

    const { handleAllow, allow, handleNavigate } = useCart();
    const [isVisible, setIsVisible] = useState();
    const myVidRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            setIsVisible(entry.isIntersecting)
        });

        const playVideo = myVidRef.current;
        if (playVideo) {
            observer.observe(playVideo);
        }

        return () => {
            if (playVideo) {
                observer.unobserve(playVideo);
            }
        };
    }, [])


    useEffect(() => {
        if (isVisible && myVidRef.current && allow) { // Eğer video görünürse ve videoRef mevcutsa
            // Sesi kapat
            myVidRef.current.muted = true;
            // Videoyu oynat
            myVidRef.current.play();
            myVidRef.current.addEventListener('ended', () => {
                myVidRef.current.currentTime = 0;
                myVidRef.current.play();
            });
        }
    }, [isVisible, allow]);

    return (
        <div className="vidCarosel-div">
            <div className="vidCarosel-hearder-group">
                <h2 className="vidCarosel-hearder">Start Your Own Business</h2>
                <p className="vidCarosel-p">It is the perfect platform to sell your own products or find the products you want. Everything you need to start a successful business is here! Start now and realize your dream job!</p>
            </div>
            <button className="btn btn-dark vidCarosel-btn" onClick={() => handleNavigate('/login2')}>Start for free</button>
            <video ref={myVidRef} className={`vidCarosel vidCarosel-before ${isVisible ? 'vidCarosel-after' : ''}`} onMouseEnter={() => handleAllow()}>
                <source src={vidCarosel} type="video/mp4"></source>
            </video>
        </div>
    );
}

export default CaroselVid;