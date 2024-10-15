import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Github, Linkedin, Mail, Moon, Sun } from 'lucide-react';
import Hero from "../components/Hero.jsx";
import Contact from "@/components/Contact.jsx";
import AboutMe from "@/components/AboutMe.jsx";
import GetStartedForm from "@/components/GetStartedForm";
import FreeWebSitePromo from "@/components/FreeWebSitePromo.jsx";
import GetStartedButton from "@/components/GetStartedButton.jsx";
import Footer from '@/components/Footer';
import Projects from '@/components/PortfolioProjects.jsx';
import CornerClock from "@/components/ui/CornerClock.jsx";
import MyMapComponent from "@/components/Map.jsx";

// Lazy load Skills component to optimize performance
const Skills = lazy(() => import('@/components/Skills'));

const Portfolio = () => {
    const [theme, setTheme] = useState('dark');
    const [showGetStartedForm, setShowGetStartedForm] = useState(false);

    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const handleGetStartedClick = () => setShowGetStartedForm(true);
    const closeGetStartedForm = () => setShowGetStartedForm(false);

    return (
        <div
            className={`min-h-screen w-full transition-colors duration-300 overflow-x-hidden ${
                theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
            }`}
        >
            {/* Hero Section */}
            <Hero />

            {/* Corner Clock */}
            <CornerClock />

            {/* About Me Section */}
            <AboutMe className="px-4 md:px-6" />

            {/* Projects Section */}
            <div className="w-full px-4 md:px-6">
                <Projects theme={theme} />



                {/* Skills Section */}
                <section className="mb-20 w-full">
                    <Suspense fallback={<div>Loading skills...</div>}>
                        <Skills theme={theme} />
                    </Suspense>
                </section>
                {/* Map Section */}
                <section className="my-10">
                    <MyMapComponent />
                </section>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Portfolio;
