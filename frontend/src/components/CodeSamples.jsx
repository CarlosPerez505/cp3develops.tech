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
    },
    {
        title: 'Fetching Data with React (useEffect)',
        description: 'This example shows how to fetch data from an API using React\'s useEffect and useState hooks.',
        code: `import React, { useState, useEffect } from 'react';

function DataFetchingComponent() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    return (
        <ul>
            {data.slice(0, 10).map(item => (
                <li key={item.id}>{item.title}</li>
            ))}
        </ul>
    );
}

export default DataFetchingComponent;`
    },
    {
        title: 'MySQL Database Query with Node.js',
        description: 'A basic MySQL database query using Node.js and the mysql package.',
        code: `const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testdb'
});

connection.connect();

connection.query('SELECT * FROM users', (error, results) => {
    if (error) throw error;
    console.log(results);
});

connection.end();`
    },
    {
        title: 'JWT Authentication in Node.js',
        description: 'A basic example of JWT authentication using Node.js and the jsonwebtoken package.',
        code: `const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const SECRET_KEY = 'mysecretkey';

app.post('/login', (req, res) => {
    const user = { id: 1, username: 'testuser' };
    const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

app.get('/protected', (req, res) => {
    const token = req.headers['authorization'];

    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) return res.sendStatus(403);
            res.json({ message: 'This is a protected route', decoded });
        });
    } else {
        res.sendStatus(403);
    }
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});`
    },
    {
        title: 'Tailwind CSS Responsive Grid',
        description: 'A simple example of using Tailwind CSS to create a responsive grid layout.',
        code: `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <div class="bg-blue-500">Item 1</div>
    <div class="bg-blue-500">Item 2</div>
    <div class="bg-blue-500">Item 3</div>
    <div class="bg-blue-500">Item 4</div>
</div>`
    },
    {
        title: 'JavaScript Array Filter',
        description: 'A simple example of using the JavaScript filter method to filter an array.',
        code: `const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.filter(number => number % 2 === 0);
console.log(evenNumbers); // [2, 4]`
    },
    {
        title: 'Basic HTML Structure',
        description: 'A very basic HTML5 template to start any project.',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Basic HTML Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>`
    },
    {
        title: 'Console Log in JavaScript',
        description: 'How to log a message to the console in JavaScript.',
        code: `console.log('Hello, World!');`
    }
];

export default codeSamples;