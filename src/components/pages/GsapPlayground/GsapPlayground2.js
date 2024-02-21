import React, { useEffect, useRef } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import image1 from '../../Images/productMavi.jpg';
import image2 from '../../Images/productYesil.jpg';
import image3 from '../../Images/productSari.jpg';

gsap.registerPlugin(ScrollTrigger);

const GsapCard = () => {
    const CardList = [
        {
            image: image1,
            cardTitle: 'Card 1',
            cardAciklama: 'Some quick example text to build on the card title and make up the bulk of the card',
        },
        {
            image: image2,
            cardTitle: 'Card 2',
            cardAciklama: 'Some quick example text to build on the card title and make up the bulk of the card',
        },
        {
            image: image3,
            cardTitle: 'Card 3',
            cardAciklama: 'Some quick example text to build on the card title and make up the bulk of the card',
        },
        {
            image: image3,
            cardTitle: 'Card 3',
            cardAciklama: 'Some quick example text to build on the card title and make up the bulk of the card',
        },
        {
            image: image3,
            cardTitle: 'Card 3',
            cardAciklama: 'Some quick example text to build on the card title and make up the bulk of the card',
        },
        {
            image: image3,
            cardTitle: 'Card 3',
            cardAciklama: 'Some quick example text to build on the card title and make up the bulk of the card',
        },
        
    ];

    const cardRefs = useRef([]);

    useEffect(() => {
        cardRefs.current.forEach((ref, index) => {
            gsap.from(ref, {
                opacity: 0,
                autoAlpha: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: ref,
                    start: 'top 90%',
                    end: 'top 10%',
                    scrub: true,
                    markers: true
                }
            });
        });
    }, []);

    return (
        <div className="card-container">
            {CardList.map((card, index) => (
                <div key={index} ref={el => (cardRefs.current[index] = el)} className="card" style={{ width: '18rem' }}>
                    <img src={card.image} className="card-img-top" alt={card.cardTitle} />
                    <div className="card-body">
                        <h5 className="card-title">{card.cardTitle}</h5>
                        <p className="card-text">{card.cardAciklama}</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GsapCard;
