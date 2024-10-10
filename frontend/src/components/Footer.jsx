import React from 'react';
import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6 mt-12 text-center">
            <p>&copy; 2024 Carlos Perez. All rights reserved.</p>

            <div className="flex justify-center space-x-6 mt-4">
                <a
                    href="https://github.com/CarlosPerez505"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-400 transition duration-300"
                >
                    <FaGithub size={24} />
                </a>
                <a
                    href="https://www.linkedin.com/in/carlos-perez-29b9b6274"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-400 transition duration-300"
                >
                    <FaLinkedin size={24} />
                </a>
                <a
                    href="https://www.facebook.com/share/fnScF3dgixEiE84i/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-400 transition duration-300"
                >
                    <FaFacebook size={24} />
                </a>
            </div>

            <div className="mt-6 text-sm max-w-md mx-auto">
                <p>
                    Disclaimer: Three lucky winners will be chosen at random. No purchase necessary to enter or win.
                    The odds of winning depend on the number of entries received. Winners will be contacted via
                    email or social media. By participating, you agree to comply with all terms and conditions.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
