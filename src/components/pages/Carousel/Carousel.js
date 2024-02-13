import image1 from './shopping.jpg';
import image2 from './shopping2.jpg';
import image3 from './shopping3.jpg';
import './Carousel.css';

const Carousel = () => {
    return (
        <div className='carousel-container'>

            <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src={image1} class="d-block w-100" alt="..." />
                    </div>
                    <div class="carousel-item">
                        <img src={image2} class="d-block w-100" alt="..." />
                    </div>
                    <div class="carousel-item">
                        <img src= {image3} class="d-block w-100" alt="..." />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Carousel;