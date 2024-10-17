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

// New JavaScript DOM Manipulation Section
const jsDomManipulationSample = {
    title: 'JavaScript DOM Manipulation',
    description: 'Basic DOM manipulation: adding, removing, and modifying elements with JavaScript.',
    code: `
    <html>
    <head>
        <title>DOM Manipulation</title>
    </head>
    <body>
        <h1 id="title">Welcome to DOM Manipulation</h1>
        <button id="changeTextBtn">Change Text</button>
        <button id="addElementBtn">Add Element</button>
        <div id="container"></div>

        <script>
            // Changing the text of an existing element
            document.getElementById('changeTextBtn').addEventListener('click', function() {
                document.getElementById('title').innerText = 'Text has been changed!';
            });

            // Adding a new element to the DOM
            document.getElementById('addElementBtn').addEventListener('click', function() {
                var newElement = document.createElement('p');
                newElement.innerText = 'This is a new element added to the DOM';
                document.getElementById('container').appendChild(newElement);
            });
        </script>
    </body>
    </html>
    `
};

// Adding DevOps code sample
const devOpsSample = {
    title: 'Dockerfile for Node.js Application',
    description: 'A simple Dockerfile configuration for containerizing a Node.js application.',
    code: `
    # Use an official Node.js image as the base image
    FROM node:14

    # Set the working directory inside the container
    WORKDIR /usr/src/app

    # Copy package.json and package-lock.json to the working directory
    COPY package*.json ./

    # Install the dependencies
    RUN npm install

    # Copy the rest of the application code to the working directory
    COPY . .

    # Expose the port the app runs on
    EXPOSE 3000

    # Command to run the application
    CMD [ "npm", "start" ]
    `
};


export default {
    htmlCssJsSample,
    reactSample,
    aiApiSample,
    jsDomManipulationSample, // Adding the new section here
    devOpsSample  // Add DevOps sample here
};
