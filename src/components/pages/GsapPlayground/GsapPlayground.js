import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './GsapPlayground.css';
import image1 from './best-ball/1.png';
import image2 from './best-ball/2.png';
import image3 from './best-ball/3.png';
import image4 from './best-ball/4.png';

gsap.registerPlugin(ScrollTrigger);

const GsapPlayground = () => {

    const [background, setBackground] = useState('#5a7d95');
    const headerRef = useRef(null);
    const revealRef = useRef([]);
    revealRef.current = [];

    const product = [
        {
            title: 'product1',
            price: 1,
            image : image1
        },
        {
            title: 'product2',
            price: 2,
            image : image2
        }, {
            title: 'product3',
            price: 3,
            image : image3
        }, {
            title: 'product4',
            price: 4,
            image : image4
        },
        {
            title: 'product4',
            price: 4,
            image : image4
        },
        {
            title: 'product4',
            price: 4,
            image : image4
        },
        {
            title: 'product4',
            price: 4,
            image : image4
        },
    ];

    const handleBackGorund = () => {
        const color = background !== '#5a7d95' ? '#5a7d95' : '#1b4943';
        setBackground(color);
    };

    const addToRef = (element) => {
        if (element && !revealRef.current.includes(element)) {
            revealRef.current.push(element);
        }
        console.log(revealRef.current);
    }

    useEffect(() => {
        gsap.to(headerRef.current, {
            duration: 1,
            backgroundColor: background,
            ease: 'none'
        });
    }, [background]);

    useEffect(() => {
        gsap.from(headerRef.current, {
            duration: 1,
            autoAlpha: 0,
            ease: 'none',
            delay: 1
        });

        revealRef.current.forEach((element, index) => {
            gsap.fromTo(element, {
                autoAlpha: 0,
            }, {
                duration: 1,
                autoAlpha: 1,
                ease: 'none',
                scrollTrigger: {
                    id: `section-${index + 1}`,
                    trigger: element,
                    start: 'center center',
                    toggleActions: 'play none none reverse',
                    markers: true
                }
            });

        })

    }, []);

    return (
        <div>
            <header>
                <p>some text</p>
                <h2>some big text</h2>
                <button onClick={handleBackGorund}>change color</button>
                {
                    product.map(({ title, price }, index) => {
                        return (
                            <div key={index} ref={addToRef} className="product-box">
                                <h2>title : {title}</h2>
                                <p>price : {price}</p>
                            </div>
                        )
                    })
                }
            </header>
        </div>
    );
}

export default GsapPlayground;
