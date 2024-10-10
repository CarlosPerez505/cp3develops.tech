import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Adjust the path based on your project structure
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'; // Import tabs from shadcn
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import codeSamples from '@/components/CodeSamples'; // Adjust the path based on your project structure

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

const skills = [
    { name: 'HTML5', category: 'Frontend', logo: html5Logo, code: null },
    { name: 'CSS3', category: 'Frontend', logo: css3Logo, code: codeSamples.find(sample => sample.title.includes('CSS Flexbox Example')) },
    { name: 'JavaScript', category: 'Frontend', logo: javascriptLogo, code: null },
    { name: 'React', category: 'Frontend', logo: reactLogo, code: codeSamples.find(sample => sample.title.includes('React Component Example')) },
    { name: 'Tailwind CSS', category: 'Frontend', logo: tailwindLogo, code: codeSamples.find(sample => sample.title.includes('Tailwind CSS Responsive Grid')) },
    { name: 'Node.js', category: 'Backend', logo: nodeLogo, code: null },
    { name: 'Express.js', category: 'Backend', logo: expressLogo, code: codeSamples.find(sample => sample.title.includes('JWT Authentication in Node.js')) },
    { name: 'MySQL', category: 'Backend', logo: mysqlLogo, code: codeSamples.find(sample => sample.title.includes('MySQL Database Query with Node.js')) },
    { name: 'Ubuntu', category: 'Backend', logo: ubuntuLogo, code: null },
    { name: 'Git', category: 'Version Control', logo: gitLogo, code: null },
    { name: 'NPM', category: 'Tools', logo: npmLogo, code: null },
    { name: 'OpenAI', category: 'AI', logo: openaiLogo, code: null },
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
    }, [filter, selectedSkill]);

    const filteredSkills = filter === 'All' ? skills : skills.filter(skill => skill.category === filter);

    return (
        <div className={`p-6 max-w-4xl mx-auto ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            {/* Tabs for Skills Filter */}
            <Tabs defaultValue="All" onValueChange={(value) => setFilter(value)}>
                <div className="rounded-md shadow-md p-4 top-0 z-50">
                    <TabsList className="grid grid-cols-2 gap-2 md:flex md:flex-wrap md:justify-center">
                        {categories.map(category => (
                            <TabsTrigger
                                key={category}
                                value={category}
                                aria-controls={`panel-${category}`}
                                className="px-5 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-gray-700 transition-all duration-300"
                            >
                                {category}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                <TabsContent value={filter} className="mt-20 md:mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredSkills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                onClick={() => setSelectedSkill(skill)}
                            >
                                <Card
                                    className={`cursor-pointer hover:shadow-lg transition-shadow ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-4`}
                                >
                                    <CardHeader>
                                        <CardTitle className="flex items-center space-x-3 md:space-x-4">
                                            <img src={skill.logo} alt={`${skill.name} logo`} className="w-6 h-6" />
                                            <span>{skill.name}</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="mb-2 text-sm">Category: {skill.category}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>

            {/* Display Code Sample if a skill is selected */}
            {selectedSkill && selectedSkill.code && (
                <div className="mt-12">
                    <h2 className="text-xl font-semibold mb-4">{`Code Example for ${selectedSkill.name}`}</h2>
                    <SyntaxHighlighter
                        language="javascript"
                        style={solarizedlight}
                        ref={codeBlockRef}
                        className="rounded-md shadow-md p-4 overflow-x-auto"
                    >
                        {selectedSkill.code.code}
                    </SyntaxHighlighter>
                </div>
            )}
        </div>
    );
};

export default Skills;
