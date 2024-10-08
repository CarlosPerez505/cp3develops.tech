import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaChess, FaCode, FaGlobe } from 'react-icons/fa';

// Register GSAP Plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const AboutMe = () => {
    useEffect(() => {
        // Animate the border effect
        gsap.fromTo(
            '.about-border',
            {
                opacity: 0,
                strokeDasharray: 1000,
                strokeDashoffset: 1000,
            },
            {
                opacity: 1,
                strokeDashoffset: 0,
                duration: 2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.about-section',
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            }
        );

        // Animate content appearance
        gsap.fromTo(
            '.about-content',
            {
                opacity: 0,
                y: 50,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: 'power3.out',
                delay: 1,
                scrollTrigger: {
                    trigger: '.about-section',
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            }
        );
    }, []);

    return (
        <div className="about-section max-w-4xl mx-auto mt-12 relative bg-cover bg-center" style={{ backgroundImage: 'url(../assets/tux.png)' }}>
            {/* SVG for Animated Border */}
            <svg
                className="about-border absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                <rect
                    x="1"
                    y="1"
                    width="98"
                    height="98"
                    fill="none"
                    stroke="#ff0000"
                    strokeWidth="2"
                />
            </svg>

            {/* Content that appears after the border animation */}
            <div className="about-content bg-white bg-opacity-80 p-8 rounded-lg shadow-lg relative z-10">
                {/* Text Section */}
                <div className="text-gray-900 text-center lg:text-left">
                    <h2 className="text-3xl font-bold mb-4 text-red-700">Carlos Perez</h2>
                    <p className="text-lg mb-4 leading-relaxed text-gray-800">
                        Hi! I'm Carlos Perez, a passionate web developer and engineer with over 11 years of professional mechanical experience, including work as a mechanic in the Army and at Baker Hughes. My background in engineering has laid a strong foundation for my career as a developer, where I apply my problem-solving skills and attention to detail to build innovative web applications.
                    </p>
                    <p className="text-lg mb-4 leading-relaxed text-gray-800">
                        I am currently working on <strong className="text-red-700">The Red Palm Project</strong>, a web app designed to raise awareness and help locate missing Indigenous people in the Southwest using advanced mapping and data analysis techniques. I strive to make a meaningful impact on real-world problems by leveraging technology.
                    </p>
                    <blockquote className="italic text-red-600 mt-4">
                        "Striving to make a meaningful impact through technology."
                    </blockquote>
                    <div className="flex space-x-6 mt-6 justify-center">
                        <div className="flex flex-col items-center hover:scale-110 transition-transform duration-200">
                            <FaCode className="text-3xl text-red-700" />
                            <span className="text-sm mt-1 text-gray-700">Web Dev</span>
                        </div>
                        <div className="flex flex-col items-center hover:scale-110 transition-transform duration-200">
                            <FaChess className="text-3xl text-red-700" />
                            <span className="text-sm mt-1 text-gray-700">Chess</span>
                        </div>
                        <div className="flex flex-col items-center hover:scale-110 transition-transform duration-200">
                            <FaGlobe className="text-3xl text-red-700" />
                            <span className="text-sm mt-1 text-gray-700">Jiu-Jitsu</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutMe;