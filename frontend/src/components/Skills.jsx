import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import codeSamples from '@/components/codeSamples'; // Assumed source of skills data

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

const logos = {
    'React Component Example': reactLogo,
    'Node.js HTTP Server': nodeLogo,
    'CSS Flexbox Example': css3Logo,
    'Fetching Data with React (useEffect)': reactLogo,
    'MySQL Database Query with Node.js': mysqlLogo,
    'JWT Authentication in Node.js': expressLogo,
    'Tailwind CSS Responsive Grid': tailwindLogo,
    'Git Commit Command': gitLogo,
    'Git Branch Command': gitLogo,
    'NPM Install Package': npmLogo,
    'NPM Init Command': npmLogo,
    'Basic HTML Structure': html5Logo,
    'Console Log in JavaScript': javascriptLogo,
};

// Skills categories for filtering
const skillCategories = {
    FullStack: ['React Component Example', 'Node.js HTTP Server', 'MySQL Database Query with Node.js'],
    Frontend: ['React Component Example', 'CSS Flexbox Example', 'Fetching Data with React (useEffect)', 'Tailwind CSS Responsive Grid', 'Basic HTML Structure'],
    Backend: ['Node.js HTTP Server', 'MySQL Database Query with Node.js', 'JWT Authentication in Node.js', 'NPM Install Package'],
    DevOps: ['Git Commit Command', 'Git Branch Command', 'NPM Init Command', 'Ubuntu Setup'],
};

const Skills = ({ theme }) => {
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState('FullStack');

    const handleCardClick = (skill) => {
        setSelectedSkill(skill);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedSkill(null);
        setModalOpen(false);
    };

    const filteredSkills = codeSamples.filter((skill) => skillCategories[currentCategory].includes(skill.title));

    return (
        <div className={`w-full p-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            <h2 className="text-3xl font-semibold mb-8">My Skills</h2>

            {/* Tabs for filtering skill categories */}
            <Tabs defaultValue="FullStack" onValueChange={setCurrentCategory}>
                <TabsList className="flex gap-4 mb-8">
                    <TabsTrigger value="FullStack" className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-purple-600">
                        Full Stack
                    </TabsTrigger>
                    <TabsTrigger value="Frontend" className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-purple-600">
                        Frontend
                    </TabsTrigger>
                    <TabsTrigger value="Backend" className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-purple-600">
                        Backend
                    </TabsTrigger>
                    <TabsTrigger value="DevOps" className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-purple-600">
                        DevOps
                    </TabsTrigger>
                </TabsList>

                {/* Display Skills in Cards */}
                <TabsContent value={currentCategory}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                        {filteredSkills.map((skill, index) => (
                            <motion.div
                                key={skill.title}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                onClick={() => handleCardClick(skill)}
                                className="w-full"
                            >
                                <Card className={`cursor-pointer hover:shadow-lg transition-shadow ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-4`}>
                                    <CardHeader>
                                        <CardTitle className="flex items-center space-x-3 md:space-x-4">
                                            <img src={logos[skill.title]} alt={`${skill.title} logo`} className="w-6 h-6" />
                                            <span>{skill.title}</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="mb-2 text-sm">{skill.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>

            {/* Fullscreen Modal for Code Sample */}
            {isModalOpen && selectedSkill && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg relative">
                        <button
                            className="absolute top-4 right-4 bg-red-500 hover:bg-red-700 text-white rounded-full p-2 focus:outline-none"
                            onClick={handleCloseModal}
                        >
                            X
                        </button>
                        <h2 className="text-2xl font-semibold mb-4 text-center">{selectedSkill.title}</h2>
                        <SyntaxHighlighter language="javascript" style={solarizedlight} className="text-sm">
                            {selectedSkill.code}
                        </SyntaxHighlighter>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Skills;

