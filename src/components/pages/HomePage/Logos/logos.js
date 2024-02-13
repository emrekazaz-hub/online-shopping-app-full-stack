
import nike from './Nike.png';
import boss from './Boss.jpg';
import champion from './Champion.jpg';
import tnf from './the-north-face.jpg';

const LogoClass = () => {

    const logosArray = [
        nike, boss, champion, tnf
    ];

    const logos = () => {
        return logosArray.map((logo, index) => (
            <img key={index} src={logo} />
        ))
    };

    return (
        <div>
            {logos()}
        </div>
    );
}

export default LogoClass;

