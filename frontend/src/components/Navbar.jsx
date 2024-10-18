import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Moon, Sun, X } from 'lucide-react';

const NavBar = ({ theme, toggleTheme }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

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
                        <Link to="/" className="text-white hover:text-gray-300 transition-colors duration-300">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/blog" className="text-white hover:text-gray-300 transition-colors duration-300">
                            Blog
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
                <li>
                    <Link to="/" className="block text-white py-2">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/blog" className="block text-white py-2">
                        Blog
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
