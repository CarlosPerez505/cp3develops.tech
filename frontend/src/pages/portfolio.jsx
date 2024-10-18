import React, { lazy, Suspense } from 'react';
import Hero from "../components/Hero.jsx";
import AboutMe from "@/components/AboutMe.jsx";
import Projects from '@/components/PortfolioProjects.jsx';
import MyMapComponent from "@/components/Map.jsx";
import BlogList from "@/blog/BlogList.jsx";

// Lazy load Skills component to optimize performance
const Skills = lazy(() => import('@/components/Skills'));

const Portfolio = ({ theme }) => {
    return (
        <div className="min-h-screen w-full transition-colors duration-300 overflow-x-hidden">
            {/* Hero Section */}
            <Hero />

            {/* About Me Section */}
            <section className="mb-20 w-full px-4 md:px-6">
                <AboutMe />
            </section>

            {/* Projects Section */}
            <div className="w-full px-4 md:px-6">
                <Projects theme={theme} />
            </div>

            {/* Skills Section */}
            <section className="mb-20 w-full">
                <Suspense fallback={<div>Loading skills...</div>}>
                    <Skills theme={theme} />
                </Suspense>
            </section>

            {/* Map Section */}
            <section className="my-10">
                <MyMapComponent theme={theme} />
            </section>

        </div>
    );
};

export default Portfolio;
