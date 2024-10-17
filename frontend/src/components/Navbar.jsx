import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Moon, Sun, X } from 'lucide-react'; // Icons for mobile menu toggle

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState('dark');

    const toggleMenu = () => setIsOpen(!isOpen);

    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <nav className="bg-gray-800 p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-white text-lg">My Portfolio</h1>
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-white focus:outline-none"
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-6">
                    <li>
                        <Link to="/" className="text-white hover:text-gray-300">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/blog" className="text-white hover:text-gray-300">
                            Blog
                        </Link>
                    </li>
                    <li>
                        <button
                            className="p-2 rounded-full transition-colors duration-300 focus:outline-none"
                            onClick={toggleTheme}
                        >
                            {theme === 'dark' ? <Sun className="text-yellow-500" /> : <Moon className="text-gray-500" />}
                        </button>
                    </li>
                </ul>
            </div>

            {/* Mobile Menu */}
            <ul className={`md:hidden ${isOpen ? 'block' : 'hidden'} mt-4 space-y-4`}>
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

            </ul>
        </nav>
    );
};

export default NavBar;
