import ImageCarosel from './imagesCarosel';
import './Carousel.css';
import React, { useEffect } from 'react';
import { useCart } from '../../CartContext/CartContext';
import iphoneImageCarousel from '../../Images/iphoneImages/carosel15Iphone.jpg';

const Carousel = () => {

    const { photos, fetchPhotos } = useCart();

    /*
    useEffect(() => {
        fetchPhotos();
    },[])    
    */

    return (
        <div className='carousel-container'>
            <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={iphoneImageCarousel} className="d-block w-100" alt="..." />
                    </div>
                    {ImageCarosel.map((photo, index) => (
                        <div key={index} className='carousel-item'>
                            <img src={photo} className="d-block w-100" alt={`Slide ${index}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Carousel;