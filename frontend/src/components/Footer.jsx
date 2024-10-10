import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6 mt-12 w-full">
            <div className="text-center">
                <p>&copy; 2024 Carlos Perez. All rights reserved.</p>
            </div>

            <div className="flex justify-center space-x-8 mt-4">
                <a
                    href="https://github.com/CarlosPerez505"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-400 transition duration-300"
                >
                    GitHub
                </a>

                <a
                    href="https://linkedin.com/in/carlos-perez-29b9b6274"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 hover:text-blue-400 transition duration-300"
                >
                    <span className="bg-blue-600 text-white rounded-lg px-2 py-1">
                        LinkedIn Badge
                    </span>
                    <span>Carlos Perez</span>
                </a>

                <a
                    href="mailto:cp3develops@gmail.com"
                    className="hover:text-gray-400 transition duration-300"
                >
                    Email Me
                </a>

                <a
                    href="https://www.facebook.com/share/fnScF3dgixEiE84i/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-400 transition duration-300"
                >
                    Facebook
                </a>
            </div>

            <div className="mt-6 text-sm text-center px-4 max-w-3xl mx-auto">
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
