// components/NavBar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Icons for mobile menu toggle

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="bg-gray-800 p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-white text-lg">My Portfolio</h1>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Links - Hidden on mobile, shown on desktop */}
            <ul className={`mt-4 md:flex md:space-x-6 ${isOpen ? '' : 'hidden'}`}>
                <li>
                    <Link to="/" className="block text-white py-2 md:inline">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/blog" className="block text-white py-2 md:inline">
                        Blog
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
