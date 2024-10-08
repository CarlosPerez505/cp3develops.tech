import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Adjust the path based on your project structure
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'; // Import tabs from shadcn
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Importing SVG logos from your assets directory
import css3Logo from '@/assets/logos/css3-color.svg';
import expressLogo from '@/assets/logos/express-color.svg';
import gitLogo from '@/assets/logos/git-color.svg';
import html5Logo from '@/assets/logos/html5-color.svg';
import javascriptLogo from '@/assets/logos/javascript-color.svg';
import mysqlLogo from '@/assets/logos/mysql-color.svg';
import nodeLogo from '@/assets/logos/nodedotjs-color.svg';
import npmLogo from '@/assets/logos/npm-color.svg';
import openaiLogo from '@/assets/logos/openai-color.svg';
import reactLogo from '@/assets/logos/react.svg';
import tailwindLogo from '@/assets/logos/tailwindcss-color.svg';
import ubuntuLogo from '@/assets/logos/ubuntu-color.svg';

const codeSamples = [
    {
        skill: 'JavaScript',
        title: 'JavaScript Counter',
        description: 'This is a basic JavaScript example of a counter using React.',
        code: `import React, { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    );
}

export default Counter;`
    },
    {
        skill: 'Node.js',
        title: 'Node.js Server',
        description: 'A simple Node.js HTTP server example.',
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
        skill: 'CSS3',
        title: 'CSS Flexbox Example',
        description: 'A simple CSS Flexbox layout.',
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
        skill: 'React',
        title: 'React Component Example',
        description: 'This is a basic React component with state management.',
        code: `function Welcome({ name }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Hello, {name}</h1>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`
    },
    {
        skill: 'Git',
        title: 'Git Commands Example',
        description: 'Basic Git commands for version control.',
        code: `# Initialize a new Git repository
git init

# Add files to staging area
git add .

# Commit changes
git commit -m "Initial commit"

# Create a new branch
git checkout -b feature-branch`
    },
    {
        skill: 'MySQL',
        title: 'MySQL Query Example',
        description: 'A simple MySQL query to select data.',
        code: `SELECT * FROM users WHERE age > 30;

INSERT INTO users (name, age) VALUES ('John Doe', 25);

UPDATE users SET age = 26 WHERE name = 'John Doe';`
    },
    {
        skill: 'Express.js',
        title: 'Express.js API Example',
        description: 'A basic Express.js API route.',
        code: `const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});`
    },
    {
        skill: 'Linux',
        title: 'Linux Commands Example',
        description: 'Basic Linux commands for system navigation.',
        code: `# List files and directories
ls -la

# Change directory
cd /path/to/directory

# Check disk space
df -h`
    },
    {
        skill: 'OpenAI',
        title: 'OpenAI API Example',
        description: 'Using OpenAI API to generate a response.',
        code: `import openai

openai.api_key = 'your-api-key'

response = openai.Completion.create(
  engine="text-davinci-002",
  prompt="Translate the following English text to French: 'Hello, how are you?'",
  max_tokens=60
)

print(response.choices[0].text.strip())`
    },
    {
        skill: 'HTML5',
        title: 'index.html',
        description: 'basic backbone of the internet.',
        code:
`<!Doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
    <script type="module" crossorigin src="/assets/index-BX81NHiO.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-CDKtLVvo.css">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`
    }
];

// Extend skills array with matching code samples
const skills = [
    { name: 'HTML5', category: 'Frontend', logo: html5Logo, code: null },
    { name: 'CSS3', category: 'Frontend', logo: css3Logo, code: codeSamples.find(sample => sample.skill === 'CSS3') },
    { name: 'JavaScript', category: 'Frontend', logo: javascriptLogo, code: codeSamples.find(sample => sample.skill === 'JavaScript') },
    { name: 'React', category: 'Frontend', logo: reactLogo, code: codeSamples.find(sample => sample.skill === 'React') },
    { name: 'Tailwind CSS', category: 'Frontend', logo: tailwindLogo, code: null },
    { name: 'Node.js', category: 'Backend', logo: nodeLogo, code: codeSamples.find(sample => sample.skill === 'Node.js') },
    { name: 'Express.js', category: 'Backend', logo: expressLogo, code: codeSamples.find(sample => sample.skill === 'Express.js') },
    { name: 'MySQL', category: 'Backend', logo: mysqlLogo, code: codeSamples.find(sample => sample.skill === 'MySQL') },
    { name: 'Ubuntu', category: 'Backend', logo: ubuntuLogo, code: codeSamples.find(sample => sample.skill === 'Linux') },
    { name: 'Git', category: 'Version Control', logo: gitLogo, code: codeSamples.find(sample => sample.skill === 'Git') },
    { name: 'NPM', category: 'Tools', logo: npmLogo, code: null },
    { name: 'OpenAI', category: 'AI', logo: openaiLogo, code: codeSamples.find(sample => sample.skill === 'OpenAI') }
];

const categories = ['All', ...new Set(skills.map(skill => skill.category))];

const Skills = ({ theme }) => {
    const [filter, setFilter] = useState('All');
    const [selectedSkill, setSelectedSkill] = useState(null);
    const codeBlockRef = useRef(null);

    useEffect(() => {
        if (codeBlockRef.current) {
            codeBlockRef.current.scrollTop = 0; // Scroll to top when code is loaded
        }
    }, [selectedSkill]);

    const filteredSkills = filter === 'All' ? skills : skills.filter(skill => skill.category === filter);

    return (
        <div className={`p-6 max-w-4xl mx-auto ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            {/* Tabs for Skills Filter */}
            <Tabs defaultValue="All" onValueChange={(value) => setFilter(value)}>
                <TabsList className="flex flex-wrap gap-2 mb-4">
                    {categories.map(category => (
                        <TabsTrigger key={category} value={category} aria-controls={`panel-${category}`}>
                            {category}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value={filter}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredSkills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card
                                    className={`cursor-pointer hover:shadow-lg transition-shadow ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
                                >
                                    <CardHeader>
                                        <CardTitle className="flex items-center space-x-2">
                                            <img src={skill.logo} alt={`${skill.name} logo`} className="w-6 h-6" />
                                            <span>{skill.name}</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p>Category: {skill.category}</p>
                                        <div>
                                            {skill.code ? (
                                                <>
                                                    <p>{skill.code.description}</p>
                                                    <SyntaxHighlighter
                                                        language={skill.name.toLowerCase()}
                                                        style={solarizedlight}
                                                        ref={codeBlockRef}
                                                    >
                                                        {skill.code.code}
                                                    </SyntaxHighlighter>
                                                </>
                                            ) : (
                                                <pre className="bg-gray-100 p-2 rounded overflow-y-auto max-h-32">
                                                    <code>No code sample available</code>
                                                </pre>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Skills;
