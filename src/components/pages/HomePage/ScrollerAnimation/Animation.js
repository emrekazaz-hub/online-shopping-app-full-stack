import './Animation.css';
import Scroller from './Scroller';
import LogoClass from '../Logos/logos';

const Animation = () => {
    return (
        <div className='animation-div'>
            <Scroller />
            <div className="scroller" data-speed="fast">
                <ul className="tag-list scroller__inner">
                    <li>JS</li>
                    <li>SSG</li>
                    <li>webdev</li>
                    <li>animation</li>
                    <li>UI/UX</li>
                </ul>
            </div>

            <div className="scroller" data-direction="right" data-speed="slow">
                <div className="scroller__inner">
                    <div className='fixed-logos'>
                        <LogoClass />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Animation;