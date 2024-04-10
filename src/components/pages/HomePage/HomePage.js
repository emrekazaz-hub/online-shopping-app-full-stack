import './HomePage.css';
import CardStatic from "../Card/CardStatic";
import Carousel from '../Carousel/Carousel';
import Animation from './ScrollerAnimation/Animation';
import Section2 from './Sections/Section2/Section2';
import Section1 from './Sections/Section1/Section1';
import Section3 from './Sections/Section3/Section3';
import DetailsSection from './Sections/DetailsSection/DetailsSection';
import CaroselVid from '../Carousel/CaroselVid/CaroselVid';
import SectionIphoneStart from './Sections/SectionIphoneStart/SectionIphoneStart';

const HomePage = () => {
    return(
        <div>
            { /*<Carousel /> */}
            <CaroselVid />
            <Animation />
            <DetailsSection />
            <Section1 />
            <SectionIphoneStart />
            <Section2 />
            <Section3 />
            <CardStatic />
        </div>
    );
}

export default HomePage;