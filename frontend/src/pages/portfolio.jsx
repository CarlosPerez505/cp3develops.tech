
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Sun, Moon } from 'lucide-react'; // Removed unused icons
import Hero from "../components/Hero.jsx";
import Contact from "@/components/Contact.jsx";
import AboutMe from "@/components/AboutMe.jsx";
import GetStartedForm from "@/components/GetStartedForm";
import FreeWebSitePromo from "@/components/FreeWebSitePromo.jsx";
import GetStartedButton from "@/components/GetStartedButton.jsx";
import Footer from '@/components/Footer';
import Projects from '@/components/PortfolioProjects.jsx';
import MyMapComponent from "@/components/Map.jsx";
import BlogList from "@/blog/BlogList.jsx";

// Lazy load Skills component to optimize performance
const Skills = lazy(() => import('@/components/Skills'));

const Portfolio = () => {
    const [theme, setTheme] = useState('dark');
    const [showGetStartedForm, setShowGetStartedForm] = useState(false);

    // Toggle between light and dark theme
    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    // Handle opening and closing the GetStartedForm
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

            {/* Blog Section */}
            <section className="my-10">
                <BlogList theme={theme} />
            </section>

            {/* Footer */}
            <Footer />

            {/* Theme Toggle Button */}
            <div className="fixed bottom-4 right-4">
                <button
                    className="p-2 rounded-full transition-colors duration-300 focus:outline-none"
                    onClick={toggleTheme}
                >
                    {theme === 'dark' ? (
                        <Sun className="text-yellow-500" />
                    ) : (
                        <Moon className="text-gray-500" />
                    )}
                </button>
            </div>

            {/* Get Started Form */}
            {showGetStartedForm && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
                    <GetStartedForm closeForm={closeGetStartedForm} />
                </div>
            )}
        </div>
    );
};

export default Portfolio;

