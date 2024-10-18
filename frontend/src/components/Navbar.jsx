import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll'; // Import Link from react-scroll
import { Menu, Moon, Sun, X } from 'lucide-react';

const NavBar = ({ theme, toggleTheme }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    // Function to calculate offset for mobile vs desktop
    const getScrollOffset = () => {
        if (window.innerWidth <= 768) {
            // Mobile devices - increase offset to make sure the section is fully visible
            return -50;
        } else {
            // Desktop devices - small or no offset needed
            return -20;
        }
    };

    return (
        <nav className="bg-gray-800 p-4">
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
                    <li>
                        <ScrollLink
                            to="about"
                            smooth={true}
                            duration={500}
                            offset={getScrollOffset()} // Dynamic offset
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
                            offset={getScrollOffset()} // Dynamic offset
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
                            offset={getScrollOffset()} // Dynamic offset
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
                            offset={getScrollOffset()} // Dynamic offset
                            className="text-white hover:text-gray-300 transition-colors duration-300 cursor-pointer"
                        >
                            Map
                        </ScrollLink>
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
                <li>
                    <ScrollLink
                        to="about"
                        smooth={true}
                        duration={500}
                        offset={getScrollOffset()} // Dynamic offset for mobile
                        className="block text-white py-2"
                        onClick={toggleMenu} // Close the menu after clicking
                    >
                        About
                    </ScrollLink>
                </li>
                <li>
                    <ScrollLink
                        to="projects"
                        smooth={true}
                        duration={500}
                        offset={getScrollOffset()} // Dynamic offset for mobile
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
                        offset={getScrollOffset()} // Dynamic offset for mobile
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
                        offset={getScrollOffset()} // Dynamic offset for mobile
                        className="block text-white py-2"
                        onClick={toggleMenu}
                    >
                        Map
                    </ScrollLink>
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
