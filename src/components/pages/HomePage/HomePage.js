import './HomePage.css';
import CardStatic from "../Card/CardStatic";
import Carousel from '../Carousel/Carousel';
import Animation from './ScrollerAnimation/Animation';

const HomePage = () => {
    return(
        <div>
            <Carousel />
            <Animation />
            <CardStatic />
        </div>
    );
}

export default HomePage;