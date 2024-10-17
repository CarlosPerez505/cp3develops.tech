import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Import code samples from the file
import codeSamples from '@/components/codeSamples';

const Skills = ({ theme }) => {
    const [selectedSample, setSelectedSample] = useState(codeSamples.htmlCssJsSample);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCategoryChange = (category) => {
        setSelectedSample(category);
        setIsModalOpen(true);  // Open the modal when a category is selected
    };

    const closeModal = () => {
        setIsModalOpen(false);  // Close the modal
    };

    return (
        <div className={`w-full p-6 sm:p-12 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            <h2 className="text-3xl font-semibold mb-6 text-center">
                My Skills...<br/>
                Click buttons to see code samples of my journey from<br/>
                HTML/CSS and JavaScript DOM Manipulation<br/>
                to React, Tailwind, AI, API, DevOps, and much more coming soon in the blog.
            </h2>

            {/* Buttons for switching categories */}
            <div className="mb-8 flex flex-col sm:flex-row sm:justify-center sm:space-x-4 gap-4">
                <button
                    className="bg-gray-800 text-white px-6 py-3 rounded hover:bg-purple-600 w-full sm:w-auto"
                    onClick={() => handleCategoryChange(codeSamples.htmlCssJsSample)}
                >
                    HTML/CSS
                </button>
                <button
                    className="bg-gray-800 text-white px-6 py-3 rounded hover:bg-purple-600 w-full sm:w-auto"
                    onClick={() => handleCategoryChange(codeSamples.jsDomManipulationSample)}
                >
                    JavaScript DOM Manipulation
                </button>
                <button
                    className="bg-gray-800 text-white px-6 py-3 rounded hover:bg-purple-600 w-full sm:w-auto"
                    onClick={() => handleCategoryChange(codeSamples.reactSample)}
                >
                    React & Tailwind
                </button>
                <button
                    className="bg-gray-800 text-white px-6 py-3 rounded hover:bg-purple-600 w-full sm:w-auto"
                    onClick={() => handleCategoryChange(codeSamples.aiApiSample)}
                >
                    AI & API
                </button>
                <button
                    className="bg-gray-800 text-white px-6 py-3 rounded hover:bg-purple-600 w-full sm:w-auto"
                    onClick={() => handleCategoryChange(codeSamples.devOpsSample)}
                >
                    DevOps
                </button>
            </div>

            {/* Modal for displaying code sample */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                    <div
                        className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-lg relative">
                        <button
                            className="absolute top-4 right-4 bg-red-500 hover:bg-red-700 text-white rounded-full p-2 focus:outline-none"
                            onClick={closeModal}
                        >
                            X
                        </button>
                        <h3 className="text-xl font-semibold mb-2">{selectedSample.title}</h3>
                        <p className="mb-4">{selectedSample.description}</p>
                        <SyntaxHighlighter language="dockerfile" style={solarizedlight} className="text-sm">
                            {selectedSample.code}
                        </SyntaxHighlighter>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Skills;
