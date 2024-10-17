import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Example code samples for different categories
const htmlCssJsSample = {
    title: 'Basic HTML/CSS/JavaScript Example',
    description: 'A basic web page using HTML, CSS, and JavaScript.',
    code: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            button { padding: 10px 20px; background-color: blue; color: white; border: none; }
        </style>
    </head>
    <body>
        <h1>Hello, World!</h1>
        <button onclick="alert('Hello from JavaScript!')">Click Me</button>
    </body>
    </html>
    `
};

const reactSample = {
    title: 'React Component Example',
    description: 'A simple React component using Tailwind for styling.',
    code: `
    import React, { useState } from 'react';

    function MyButton() {
        const [count, setCount] = useState(0);
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-2xl font-semibold mb-4">You clicked {count} times</h1>
                <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => setCount(count + 1)}
                >
                    Click me
                </button>
            </div>
        );
    }

    export default MyButton;
    `
};

const aiApiSample = {
    title: 'AI Integration Example',
    description: 'A simple API call to OpenAI using React.',
    code: `
    import React, { useState } from 'react';

    function OpenAICall() {
        const [response, setResponse] = useState(null);

        const fetchResponse = async () => {
            const res = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer YOUR_API_KEY'
                },
                body: JSON.stringify({
                    prompt: "What is React?",
                    max_tokens: 50
                })
            });
            const data = await res.json();
            setResponse(data.choices[0].text);
        };

        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
                    onClick={fetchResponse}
                >
                    Ask AI
                </button>
                {response && <p className="mt-4">{response}</p>}
            </div>
        );
    }

    export default OpenAICall;
    `
};

const Skills = ({ theme }) => {
    const [selectedCategory, setSelectedCategory] = useState('HTML/CSS/JavaScript');
    const [selectedSample, setSelectedSample] = useState(htmlCssJsSample);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        switch (category) {
            case 'HTML/CSS/JavaScript':
                setSelectedSample(htmlCssJsSample);
                break;
            case 'React':
                setSelectedSample(reactSample);
                break;
            case 'AI/API':
                setSelectedSample(aiApiSample);
                break;
            default:
                setSelectedSample(htmlCssJsSample);
                break;
        }
        setIsModalOpen(true);  // Open the modal when a category is selected
    };

    const closeModal = () => {
        setIsModalOpen(false);  // Close the modal
    };

    return (
        <div className={`w-full p-11 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            <h2 className="text-3xl font-semibold mb-8">My Skills...touch buttons to see code samples of my journey from
                Javascript HTML/CSS to React, Tailwind, AI, and API Integration.</h2>

            {/* Buttons for switching categories */}
            <div className="mb-8 flex flex-col sm:flex-row sm:justify-around gap-2">
                <button
                    className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-purple-600 w-full sm:w-auto"
                    onClick={() => handleCategoryChange('HTML/CSS/JavaScript')}
                >
                    HTML/CSS/JavaScript
                </button>
                <button
                    className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-purple-600 w-full sm:w-auto"
                    onClick={() => handleCategoryChange('React')}
                >
                    React & Tailwind
                </button>
                <button
                    className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-purple-600 w-full sm:w-auto"
                    onClick={() => handleCategoryChange('AI/API')}
                >
                    AI & API
                </button>
            </div>

            {/* Modal for displaying code sample */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg relative">
                        <button
                            className="absolute top-4 right-4 bg-red-500 hover:bg-red-700 text-white rounded-full p-2 focus:outline-none"
                            onClick={closeModal}
                        >
                            X
                        </button>
                        <h3 className="text-xl font-semibold mb-2">{selectedSample.title}</h3>
                        <p className="mb-4">{selectedSample.description}</p>
                        <SyntaxHighlighter language="javascript" style={solarizedlight} className="text-sm">
                            {selectedSample.code}
                        </SyntaxHighlighter>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Skills;
