import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Adjust the path based on your project structure

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
    { name: 'HTML5', category: 'Frontend', logo: html5Logo },
    { name: 'CSS3', category: 'Frontend', logo: css3Logo },
    { name: 'JavaScript', category: 'Frontend', logo: javascriptLogo },
    { name: 'React', category: 'Frontend', logo: reactLogo },
    { name: 'Tailwind CSS', category: 'Frontend', logo: tailwindLogo },
    { name: 'Node.js', category: 'Backend', logo: nodeLogo },
    { name: 'Express.js', category: 'Backend', logo: expressLogo },
    { name: 'MySQL', category: 'Backend', logo: mysqlLogo },
    { name: 'Ubuntu', category: 'Backend', logo: ubuntuLogo },
    { name: 'Git', category: 'Version Control', logo: gitLogo },
    { name: 'NPM', category: 'Tools', logo: npmLogo },
    { name: 'OpenAI', category: 'AI', logo: openaiLogo },
];

const categories = ['All', ...new Set(skills.map(skill => skill.category))];

const Skills = ({ theme }) => {
    const [filter, setFilter] = useState('All');
    const [selectedSkill, setSelectedSkill] = useState(null);

    const filteredSkills = filter === 'All' ? skills : skills.filter(skill => skill.category === filter);

    return (
        <div className={`p-6 max-w-4xl mx-auto ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            {/* Skills Filter */}
            <div className="flex flex-wrap gap-2 mb-4">
                {categories.map(category => (
                    <button
                        key={category}
                        className={`px-4 py-2 rounded-full ${filter === category ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                        onClick={() => setFilter(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Skill Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSkills.map(skill => (
                    <Card
                        key={skill.name}
                        className={`cursor-pointer hover:shadow-lg transition-shadow ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
                        onClick={() => setSelectedSkill(skill)}
                    >
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <img src={skill.logo} alt={`${skill.name} logo`} className="w-6 h-6" />
                                <span>{skill.name}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Category: {skill.category}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Selected Skill Example */}
            {selectedSkill && (
                <Card className={`mt-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <CardHeader>
                        <CardTitle>{selectedSkill.name} Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <img src={selectedSkill.logo} alt={`${selectedSkill.name} logo`} className="w-12 h-12 mb-4" />
                        <p>More information about {selectedSkill.name} here...</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default Skills;
