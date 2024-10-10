import React from 'react';
import Portfolio from "@/pages/portfolio.jsx";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6 mt-12">

            <p>&copy; 2024 Carlos Perez. All rights reserved.</p>

            <div className="flex justify-center space-x-4 mt-4">
                <a
                    href="https://github.com/CarlosPerez505"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-400 transition duration-300"
                >
                    GitHub
                </a>
                <a
                    href="https://www.linkedin.com/in/yourprofile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-400 transition duration-300"
                >
                    LinkedIn
                </a>
                <a
                    href="mailto:cp3develops@gmail.com"
                    className="hover:text-gray-400 transition duration-300"
                >
                    Email Me
                </a>
                <a
                    href="https://www.facebook.com/yourprofile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-400 transition duration-300"
                >
                    Facebook
                </a>

                <div className="mt-6 text-sm">
                    <p>
                        Disclaimer: Three lucky winners will be chosen at random. No purchase necessary to enter or win.
                        The odds of winning depend on the number of entries received. Winners will be contacted via
                        email or social media. By participating, you agree to comply with all terms and conditions.
                    </p>
                </div>
            </div>
        </footer>
    )
};

export default Footer;