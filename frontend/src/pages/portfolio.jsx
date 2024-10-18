import React, { lazy, Suspense } from 'react';
import Hero from "../components/Hero.jsx";
import AboutMe from "@/components/AboutMe.jsx";
import Projects from '@/components/PortfolioProjects.jsx';
import MyMapComponent from "@/components/Map.jsx";
import { Element } from 'react-scroll'; // Import Element for section linking

// Lazy load Skills component to optimize performance
const Skills = lazy(() => import('@/components/Skills'));

const Portfolio = ({ theme }) => {
    return (
        <div className="min-h-screen w-full transition-colors duration-300 overflow-x-hidden">
            {/* Hero Section */}
            <Hero />

            {/* About Me Section */}
            <Element name="about">
                <section className="mb-20 w-full px-4 md:px-6">
                    <AboutMe />
                </section>
            </Element>

            {/* Projects Section */}
            <Element name="projects">
                <div className="w-full px-4 md:px-6">
                    <Projects theme={theme} />
                </div>
            </Element>

            {/* Skills Section */}
            <Element name="skills">
                <section className="mb-20 w-full">
                    <Suspense fallback={<div>Loading skills...</div>}>
                        <Skills theme={theme} />
                    </Suspense>
                </section>
            </Element>

            {/* Map Section */}
            <Element name="map">
                <section className="my-10">
                    <MyMapComponent theme={theme} />
                </section>
            </Element>
        </div>
    );
};

export default Portfolio;
