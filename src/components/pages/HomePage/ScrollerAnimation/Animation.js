import './Animation.css';
import Scroller from './Scroller';
import LogoClass from '../Logos/logos';
import imgDeneme from '../../../Images/iphoneImages/icon_enclosure.png';
import { logosArray } from '../Logos/logos';

const Animation = () => {
    return (
        <div className='animation-div'>
            <Scroller />
            <div className="scroller" data-speed="fast">
                <ul className="tag-list scroller__inner">
                    {logosArray.map((logo,index) => (
                        <ul key={index}>
                            <img src={logo}></img>
                        </ul>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Animation;