import React, { useRef, useEffect, useState } from "react";
import './Section2.css';
import ScrollFadeAnimation from "../ScrollFadeAnimation/ScrollFadeAnimation";
import iphone from '../../../../Images/iphoneImages/red48mp.jpg';
import video from '../../../../Images/iphoneImages/iphoneCameraVid.mp4';


const Section2 = () => {

    const [isVisible, setIsVisible] = useState();
    const videoRef = useRef(null);

    const myRef = useRef();
    console.log('isVible: ', isVisible)
    useEffect(() => {
        console.log('myref : ', myRef.current);
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            setIsVisible(entry.isIntersecting)
        });

        const iphoneImageAnimation = document.querySelector('.animation-point');
        if (iphoneImageAnimation) {
            observer.observe(iphoneImageAnimation);
        }

        const paragraphAnimation = document.querySelector('.paragraph-after');
        if (paragraphAnimation) {
            observer.observe(paragraphAnimation);
        }

        const paragraphAnimation2 = document.querySelector('.paragraph-after2');
        if (paragraphAnimation2) {
            observer.observe(paragraphAnimation2);
        }

        const paragraphAnimationIphoneHeader = document.querySelector('paragraph-video-before');
        if(paragraphAnimation){
            observer.observe(paragraphAnimationIphoneHeader);
        }

        const videoPlay = document.querySelector('video-before');
        if(videoPlay){
            observer.observe(videoPlay);
        }

        return () => {
            observer.unobserve(iphoneImageAnimation, paragraphAnimation, paragraphAnimation2, paragraphAnimationIphoneHeader, videoPlay);
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
            <section className="section2">
                <div className="animation-box">
                    <div>
                        <img src={iphone} className={`img-before ${isVisible ? 'img-animation-after' : ''}`}></img>
                    </div>

                    <div className="paragraph-group">
                        <p className={`paragraph-before ${isVisible ? 'paragraph-after' : ''}`}>The 48MP Main camera is more advanced than ever, capturing super‑high‑resolution photos with a new level of detail and color.</p>
                        <p className={`paragraph-before ${isVisible ? 'paragraph-after2' : ''}`}>You’ll see the improvements in your portraits. And now you no longer have to switch to Portrait mode. If your subject is a person, dog, or cat, iPhone automatically captures depth information. So you can choose to instantly see your photo as a portrait, with an artful blur effect. Or later in the Photos app.</p>
                    </div>

                    <div>
                        <h2 className="animation-point"></h2>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default Section2;
