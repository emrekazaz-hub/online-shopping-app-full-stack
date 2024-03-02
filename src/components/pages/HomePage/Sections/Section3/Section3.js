import React, { useRef, useEffect, useState } from "react";
import './Section3.css';
import ScrollFadeAnimation from "../ScrollFadeAnimation/ScrollFadeAnimation";
import iphone from '../../../../Images/iphoneImages/red48mp.jpg';
import video from '../../../../Images/iphoneImages/iphoneCameraVid.mp4';


const Section3 = () => {

    const [isVisible, setIsVisible] = useState();
    const videoRef = useRef(null);

    const myRef = useRef();
    useEffect(() => {
        console.log('myref : ', myRef.current);
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            setIsVisible(entry.isIntersecting)
        });

        const paragraphAnimationIphoneHeader = document.querySelector('.paragraph-video-before');
        if(paragraphAnimationIphoneHeader){
            observer.observe(paragraphAnimationIphoneHeader);
        }

        const videoPlay = document.querySelector('.video-before');
        if(videoPlay){
            observer.observe(videoPlay);
        }

        return () => {
            observer.unobserve(paragraphAnimationIphoneHeader, videoPlay);
        };
    }, [])
    
    useEffect(() => {
        if (isVisible && videoRef.current) { // Eğer video görünürse ve videoRef mevcutsa
            // Sesi kapat
            videoRef.current.muted = true;
            // Videoyu oynat
            videoRef.current.play();
        }
    }, []);

    return (
        <div>

            <section className="section-iphone-video">
                <div className="animation-box-iphone-video">
                    <div>

                        <div className="paragraph-header-div">
                            <p className={`paragraph-video-before ${isVisible ? 'paragraph-video-after' : ''}`}>All-new 48MP Main camera. <br></br>
                                For breathtaking, smile- <br></br>making picture taking.
                                {console.log('for paragraf : ', isVisible)}
                            </p>
                        </div>

                        <div>
                            <video ref={videoRef} id="iphoneVideo" className={`video-before ${isVisible ? 'video-after' : ''}`}>
                                <source src={video} type="video/mp4" />
                            </video>
                        </div>
                    </div>

                </div>
            </section>

        </div>
    );
}

export default Section3;
