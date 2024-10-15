import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP Plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const Hero = () => {
    useEffect(() => {
        // Text Animation
        gsap.fromTo(
            '.hero-text',
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.5,
                ease: 'power3.out',
                stagger: 0.3,
                scrollTrigger: {
                    trigger: '.hero-section',
                    start: 'top center',
                    toggleActions: 'play none none none',
                },
            }
        );

        // Background Image Animation
        gsap.to('.background-image', {
            scale: 1.05,
            duration: 8,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
        });
    }, []);

    const handleGetStartedClick = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="hero-section relative w-full px-4 pt-20 lg:px-8 text-white overflow-hidden">
            {/* Background Image */}
            <div
                className="background-image absolute inset-0 -z-10"
                style={{
                    backgroundImage: `url('https://kubrick.htvapps.com/htv-prod-media.s3.amazonaws.com/images/northern-lights-courtesy-brad-berry-663ee503c2d6b.jpg?crop=0.75xw:1xh;center,top&resize=660:*')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: '100vh', // Ensure it takes full height of the viewport
                    width: '100vw',  // Ensure it takes full width of the viewport
                }}
            />


            {/* Main Content */}
            <div className="mx-auto max-w-7xl py-32 sm:py-48 lg:py-56 text-center">
                <h1 className="hero-text text-5xl font-bold tracking-tight text-white sm:text-7xl">
                    Hello, I'm Carlos, a <br/>
                    FullStack Web Developer!
                </h1>
                <p className="hero-text mt-6 text-lg leading-8 text-gray-100 sm:text-xl">
                    Let me help make your vision of a website come to life.
                </p>
            </div>
        </div>
    );
};

export default Hero;
