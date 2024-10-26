import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll'; // Scroll for in-page navigation
import { Link, useLocation } from 'react-router-dom'; // For route detection
import { Menu, Moon, Sun, X } from 'lucide-react';

const NavBar = ({ theme, toggleTheme }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [offset, setOffset] = useState(-20);
    const location = useLocation(); // Detect current route

    const toggleMenu = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setOffset(-50); // Larger offset for mobile
            } else {
                setOffset(-20); // Smaller offset for desktop
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isBlogPage = location.pathname.startsWith('/blog');

    return (
        <nav className="bg-gray-800 p-4 sticky top-0 z-50">
            <div className="flex justify-between items-center">
                {/* Brand Name */}
                <h1 className="text-white text-lg font-bold">My Portfolio</h1>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-8 items-center">
                    {isBlogPage && (
                        <li>
                            <Link
                                to="/"
                                className="text-white hover:text-gray-300 transition-colors duration-300 cursor-pointer"
                            >
                                Home
                            </Link>
                        </li>
                    )}
                    {!isBlogPage && (
                        <>
                            <li>
                                <ScrollLink
                                    to="about"
                                    smooth={true}
                                    duration={500}
                                    offset={offset}
                                    className="text-white hover:text-gray-300 transition-colors duration-300 cursor-pointer"
                                >
                                    About
                                </ScrollLink>
                            </li>
                            <li>
                                <ScrollLink
                                    to="projects"
                                    smooth={true}
                                    duration={500}
                                    offset={offset}
                                    className="text-white hover:text-gray-300 transition-colors duration-300 cursor-pointer"
                                >
                                    Projects
                                </ScrollLink>
                            </li>
                            <li>
                                <ScrollLink
                                    to="skills"
                                    smooth={true}
                                    duration={500}
                                    offset={offset}
                                    className="text-white hover:text-gray-300 transition-colors duration-300 cursor-pointer"
                                >
                                    Skills
                                </ScrollLink>
                            </li>
                            <li>
                                <ScrollLink
                                    to="map"
                                    smooth={true}
                                    duration={500}
                                    offset={offset}
                                    className="text-white hover:text-gray-300 transition-colors duration-300 cursor-pointer"
                                >
                                    Map
                                </ScrollLink>
                            </li>
                        </>
                    )}
                    <li>
                        <Link
                            to="/blog"
                            className="text-white hover:text-gray-300 transition-colors duration-300 cursor-pointer"
                        >
                            Blog
                        </Link>
                    </li>
                    {/* Add Login Link */}
                    <li>
                        <Link
                            to="/login"
                            className="text-white hover:text-gray-300 transition-colors duration-300 cursor-pointer"
                        >
                            Login
                        </Link>
                    </li>
                    <li>
                        <button
                            className="p-2 rounded-full transition-colors duration-300 focus:outline-none"
                            onClick={toggleTheme}
                        >
                            {theme === 'dark' ? (
                                <Sun className="text-yellow-500" size={24} />
                            ) : (
                                <Moon className="text-gray-500" size={24} />
                            )}
                        </button>
                    </li>
                </ul>
            </div>

            {/* Mobile Menu */}
            <ul className={`md:hidden mt-4 space-y-4 ${isOpen ? 'block' : 'hidden'}`}>
                {isBlogPage && (
                    <li>
                        <Link
                            to="/"
                            className="block text-white py-2"
                            onClick={toggleMenu}
                        >
                            Home
                        </Link>
                    </li>
                )}
                {!isBlogPage && (
                    <>
                        <li>
                            <ScrollLink
                                to="about"
                                smooth={true}
                                duration={500}
                                offset={offset}
                                className="block text-white py-2"
                                onClick={toggleMenu}
                            >
                                About
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink
                                to="projects"
                                smooth={true}
                                duration={500}
                                offset={offset}
                                className="block text-white py-2"
                                onClick={toggleMenu}
                            >
                                Projects
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink
                                to="skills"
                                smooth={true}
                                duration={500}
                                offset={offset}
                                className="block text-white py-2"
                                onClick={toggleMenu}
                            >
                                Skills
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink
                                to="map"
                                smooth={true}
                                duration={500}
                                offset={offset}
                                className="block text-white py-2"
                                onClick={toggleMenu}
                            >
                                Map
                            </ScrollLink>
                        </li>
                    </>
                )}
                <li>
                    <Link
                        to="/blog"
                        className="block text-white py-2"
                        onClick={toggleMenu}
                    >
                        Blog
                    </Link>
                </li>
                {/* Add Mobile Login Link */}
                <li>
                    <Link
                        to="/login"
                        className="block text-white py-2"
                        onClick={toggleMenu}
                    >
                        Login
                    </Link>
                </li>
                <li>
                    <button
                        className="block text-white py-2"
                        onClick={toggleTheme}
                    >
                        {theme === 'dark' ? (
                            <Sun className="text-yellow-500" size={24} />
                        ) : (
                            <Moon className="text-gray-500" size={24} />
                        )}
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
