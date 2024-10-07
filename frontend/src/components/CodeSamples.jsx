import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Make sure to adjust the path based on your project structure

const codeSamples = [
    {
        title: 'React Component Example',
        description: 'This is a basic example of a functional React component that manages state and handles events.',
        code: `import React, { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}

export default Counter;`
    },
    {
        title: 'Node.js HTTP Server',
        description: 'A simple HTTP server built using Node.js that responds with "Hello, World!".',
        code: `const http = require('http');

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!');
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});`
    },
    {
        title: 'CSS Flexbox Example',
        description: 'This example demonstrates how to use CSS Flexbox to center content both vertically and horizontally.',
        code: `.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.box {
    width: 200px;
    height: 200px;
    background-color: #4caf50;
}`
    }
];

const CodeSamples = ({ theme }) => {
    return (
        <div className={`p-6 max-w-4xl mx-auto ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            <h2 className="text-2xl font-semibold mb-4">Code Samples</h2>

            {/* Code Samples Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {codeSamples.map((sample, index) => (
                    <Card
                        key={index}
                        className={`cursor-pointer hover:shadow-lg transition-shadow ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
                    >
                        <CardHeader>
                            <CardTitle>{sample.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{sample.description}</p>
                            <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
                                <code>{sample.code}</code>
                            </pre>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default CodeSamples;
