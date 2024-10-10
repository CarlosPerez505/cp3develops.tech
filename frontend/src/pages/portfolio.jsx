import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Github, Linkedin, Mail, Moon, Sun } from 'lucide-react';
import Hero from "../components/Hero.jsx";
import Contact from "@/components/Contact.jsx";
import AboutMe from "@/components/AboutMe.jsx";
import PricingPlan from "@/components/PricingPlan.jsx";
import GetStartedForm from "@/components/GetStartedForm";
import FreeWebSitePromo from "@/components/FreeWebSitePromo.jsx";
import GetStartedButton from "@/components/GetStartedButton.jsx";
import Footer from '@/components/Footer'; // Importing Footer component
import Projects from '@/components/PortfolioProjects.jsx'; // Importing Projects component

// Lazy load Skills component (optional to optimize bundle)
const Skills = lazy(() => import('@/components/Skills'));

const Portfolio = () => {
    const [theme, setTheme] = useState('dark');
    const [showGetStartedForm, setShowGetStartedForm] = useState(false);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const handleGetStartedClick = () => {
        setShowGetStartedForm(true);
    };

    const closeGetStartedForm = () => {
        setShowGetStartedForm(false);
    };

    return (
        <div
            className={`min-h-screen w-full transition-colors duration-300 overflow-x-hidden ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}
        >
            <Hero />
            <AboutMe />{/* Full-width hero section */}
            <div className="w-full px-4 md:px-6"> {/* Adjusted padding to prevent horizontal scroll */}
                <Projects theme={theme} /> {/* Projects section */}

                <section className="mb-20 w-full"> {/* Full-width section */}
                    <Suspense fallback={<div>Loading skills...</div>}>
                        <Skills theme={theme} />
                    </Suspense>
                </section>

                <section className="mb-20 w-full"> {/* Full-width section */}
                    <PricingPlan />
                </section>

                <section id="contact" className="mb-20 w-full"> {/* Full-width section */}
                    <Contact />
                </section>
            </div>
            <Footer /> {/* Full-width Footer */}
        </div>
    );
};

export default Portfolio;