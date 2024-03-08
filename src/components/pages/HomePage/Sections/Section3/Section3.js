import React, { useRef, useEffect, useState } from "react";
import { useCart } from "../../../../CartContext/CartContext";
import './Section3.css';
import ScrollFadeAnimation from "../ScrollFadeAnimation/ScrollFadeAnimation";
import iphone from '../../../../Images/iphoneImages/red48mp.jpg';
import video from '../../../../Images/iphoneImages/iphoneCameraVid.mp4';
import video2 from '../../../../Images/iphoneImages/iphoneCameraVid2.mp4';
import shieldImg from '../../../../Images/iphoneImages/icon_ceramic_shield.png';
import waterImg from '../../../../Images/iphoneImages/icon_water.png';
import enclosureImg from '../../../../Images/iphoneImages/icon_enclosure.png';


const Section3 = () => {

    const { handleAllow, allow } = useCart();

    const [isVisible, setIsVisible] = useState();
    const videoRef = useRef(null);

    const myRef = useRef();
    useEffect(() => {
        console.log('myref : ', myRef.current);
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            setIsVisible(entry.isIntersecting)
        });

        const paragraphAnimationIphoneHeader = document.querySelector('.video-before');
        if (paragraphAnimationIphoneHeader) {
            observer.observe(paragraphAnimationIphoneHeader);
        }

        const videoPlay = document.querySelector('.video-before');
        if (videoPlay) {
            observer.observe(videoPlay);
        }

        const iconGroup = document.querySelector('.img-p-tag-div-before');
        if (iconGroup) {
            observer.observe(iconGroup);
        }

        return () => {
            observer.unobserve(paragraphAnimationIphoneHeader, videoPlay, iconGroup);
        };
    }, [])

    useEffect(() => {
        if (isVisible && videoRef.current && allow) { // Eğer video görünürse ve videoRef mevcutsa
            // Sesi kapat
            videoRef.current.muted = true;
            // Videoyu oynat
            videoRef.current.play();
        }
    }, [isVisible, allow]);

    return (
        <div>

            <section className="section-iphone-video">
                <div className="animation-box-iphone-video">
                    <div style={{display: 'block', textAlign: 'center'}}>

                        <div className="paragraph-header-div">
                            <p className={`paragraph-video-before ${isVisible ? 'paragraph-video-after' : ''}`}>All-new 48MP Main camera. <br></br>
                                For breathtaking, smile- <br></br>making picture taking.
                            </p>
                        </div>

                        <div className="videoBox-div">
                            <video ref={videoRef} id="iphoneVideo" className={`video-before ${isVisible ? 'video-after' : ''}`} onMouseEnter={() => handleAllow()}>
                                <source src={video2} type="video/mp4" />
                                {console.log('allow : ', allow)}
                            </video>
                        </div>

                        <div className="paragraf-bottom-div">
                            <div className={`img-p-tag-div-before ${isVisible ? 'img-p-tag-div-after delay1' : ''}`}>
                                <img src={shieldImg}></img>
                                <p className="icon-p-tag">
                                    <b>Dependably durable.</b><br />
                                    The Ceramic Shield<br />
                                    front is tougher than<br />
                                    any smartphone glass.</p>
                            </div>
                            <div className={`img-p-tag-div-before ${isVisible ? 'img-p-tag-div-after delay2' : ''}`}>
                                <img src={waterImg}></img>
                                <p className="icon-p-tag">
                                    <b>Remarkably resistant.</b><br />
                                    iPhone is splash, water,<br />
                                    and dust resistant.<br />
                                    What a relief.</p>
                            </div>
                            <div className={`img-p-tag-div-before ${isVisible ? 'img-p-tag-div-after delay3' : ''}`}>
                                <img src={enclosureImg}></img>
                                <p className="icon-p-tag">
                                    <b>Truly tough.</b><br />
                                    The aerospace-grade<br />
                                    aluminum enclosure is<br />
                                    super strong and light.</p>
                            </div>

                        </div>


                        <button className="btn btn-dark">Explore More</button>

                    </div>

                </div>
            </section>

        </div>
    );
}

export default Section3;
