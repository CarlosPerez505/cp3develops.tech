import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Moon, Sun, Code, Monitor, Server, Utensils, Heart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card.tsx';
import {Tabs, TabsContent, TabsList, TabsTrigger} from './ui/tabs.tsx'
import { Badge } from './ui/badge.tsx';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import jsLogo from '@/assets/logos/javascript-color.svg';
import reactLogo from '@/assets/logos/react.svg';
import nodeLogo from '@/assets/logos/nodedotjs-color.svg'
import expressLogo from '@/assets/logos/express-color.svg';
import tailwindLogo from '@/assets/logos/tailwindcss-color.svg';
import mySqlLogo from '@/assets/logos/mysql-color.svg'


const Portfolio = () => {
    const [theme, setTheme] = useState('dark');

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const projects = [
        {
            title: 'MMIP Crisis Awareness App',
            description: 'A full-stack application aimed at raising awareness and providing resources for the Missing and Murdered Indigenous Peoples crisis.',
            link: '#',
            category: 'fullstack',
            details: [
                'Developed using modern full-stack technologies',
                'Features data visualization of MMIP statistics',
                'Includes a resource directory for affected communities',
                'Implements user authentication and data security measures',
                'Integrates with external APIs for real-time data',
                'Responsive design for accessibility on various devices'
            ],
            tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Data Visualization', 'API Integration']
        },
        {
            title: 'BBQ Restaurant Website',
            description: 'A mobile-friendly BBQ restaurant website built with React and Tailwind CSS, featuring a parallax effect, interactive menu carousel, and embedded Google Maps.',
            link: '#',
            category: 'frontend',
            details: [
                'Implemented using React and Tailwind CSS',
                'Features a parallax scrolling effect for visual appeal',
                'Includes an interactive menu carousel for easy navigation',
                'Integrates Google Maps for location display',
                'Utilizes neomorphic design for a modern look',
                'Responsive layout for optimal viewing on various devices'
            ],
            tags: ['React', 'Tailwind CSS', 'Responsive Design', 'Google Maps API']
        },
        // ... other projects ...
    ];

    const skills = [
        { name: 'JavaScript', value: 90, logo: jsLogo},
        { name: 'React', value: 85, logo: reactLogo },
        { name: 'Node.js', value: 80,  logo: nodeLogo },
        { name: 'MySql', value: 75,  logo: mySqlLogo },
        { name: 'Express', value: 80,  logo: expressLogo },
        { name: 'Full-Stack Development', value: 85,  logo: jsLogo },
        { name: 'API Integration', value: 80, logo: jsLogo },
        { name: 'Data Visualization', value: 75, logo: jsLogo },
        { name: 'Tailwind CSS', value: 80, logo: tailwindLogo},
        { name: 'Responsive Design', value: 85, logo: jsLogo },
    ];


    const SkillProgress = ({ value }) => (
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${value}%` }}
            ></div>
        </div>
    );

    return (
        <div className={`min-h-screen p-8 transition-colors duration-300 ${
            theme === 'dark'
                ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-white'
                : 'bg-gradient-to-br from-gray-100 via-purple-100 to-violet-200 text-gray-900'
        }`}>
            <div className="max-w-6xl mx-auto">
                <header className="mb-12 relative">
                    <div className={`absolute inset-0 blur-lg opacity-30 ${
                        theme === 'dark' ? 'bg-purple-500' : 'bg-purple-300'
                    }`}></div>
                    <div className="relative z-10 flex justify-between items-center">
                        <h1 className="text-4xl font-bold">Carlos Perez</h1>
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-full ${
                                theme === 'dark' ? 'bg-violet-800 text-white' : 'bg-violet-200 text-gray-900'
                            }`}
                        >
                            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
                        </button>
                    </div>
                    <p className="text-xl mt-2 relative z-10">Full Stack Developer | Social Impact Technologist</p>
                    <div className="flex space-x-4 mt-4 relative z-10">
                        <a href="#https://github.com//CarlosPerez505" className="text-opacity-60 hover:text-opacity-100 transition-opacity"><Github size={24} /></a>
                        <a href="#https://linkedin.com/in/carlos-perez-29b9b6274/" className="text-opacity-60 hover:text-opacity-100 transition-opacity"><Linkedin size={24} /></a>
                        <a href="mailto:cp3develops@gmail.com" className="text-opacity-60 hover:text-opacity-100 transition-opacity"><Mail size={24} /></a>
                    </div>
                </header>

                <main>
                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4">About Me</h2>
                        <Card className={`${
                            theme === 'dark'
                                ? 'bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg'
                                : 'bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-md'
                        } border-none p-6`}>
                            <CardContent>
                                <p>
                                    I'm a passionate full-stack web developer with a focus on creating impactful applications.
                                    My expertise spans modern JavaScript frameworks, database management, and API integration.
                                    I'm dedicated to using technology to address critical social issues and improve communities.
                                </p>
                            </CardContent>
                        </Card>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4">Featured Projects</h2>
                        <Tabs defaultValue="all" className="mb-6">
                            <TabsList className={`${
                                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
                            } p-1 rounded-lg`}>
                                <TabsTrigger value="all" className="px-4 py-2 rounded-md">All</TabsTrigger>
                                <TabsTrigger value="fullstack" className="px-4 py-2 rounded-md">Full Stack</TabsTrigger>
                                <TabsTrigger value="frontend" className="px-4 py-2 rounded-md">Frontend</TabsTrigger>
                                <TabsTrigger value="backend" className="px-4 py-2 rounded-md">Backend</TabsTrigger>
                            </TabsList>
                            <TabsContent value="all">
                                <ProjectGrid projects={projects} theme={theme} />
                            </TabsContent>
                            <TabsContent value="fullstack">
                                <ProjectGrid projects={projects.filter(p => p.category === 'fullstack')} theme={theme} />
                            </TabsContent>
                            <TabsContent value="frontend">
                                <ProjectGrid projects={projects.filter(p => p.category === 'frontend')} theme={theme} />
                            </TabsContent>
                            <TabsContent value="backend">
                                <ProjectGrid projects={projects.filter(p => p.category === 'backend')} theme={theme} />
                            </TabsContent>
                        </Tabs>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Skills</h2>
                        <Card className={`${
                            theme === 'dark'
                                ? 'bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg'
                                : 'bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-md'
                        } p-6`}>
                            {skills.map((skill, index) => (
                                <div key={index} className="flex items-center space-x-4 p-4 bg-white shadow rounded-lg dark:bg-gray-800">
                                    <img src={skill.logo} alt={skill.name} className="w-12 h-12" />
                                    <div className="flex-grow">
                                        <h3 className="text-xl font-medium">{skill.name}</h3>
                                        <SkillProgress value={skill.value} />
                                    </div>
                                    <span className="font-semibold">{skill.value}%</span>
                                </div>
                            ))}
                        </Card>
                    </section>
                </main>

                <footer className="mt-12 text-center text-opacity-60">
                    <p>&copy; 2024 Carlos Perez. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
};

const ProjectGrid = ({ projects, theme }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
            <Card key={index} className={`${
                theme === 'dark'
                    ? 'bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg'
                    : 'bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-md'
            } border-none transition-transform duration-300 transform hover:scale-105`}>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        {project.category === 'frontend' && <Monitor size={20} className="mr-2 text-green-400" />}
                        {project.category === 'backend' && <Server size={20} className="mr-2 text-blue-400" />}
                        {project.category === 'fullstack' && <Code size={20} className="mr-2 text-purple-400" />}
                        {project.title === 'BBQ Restaurant Website' && <Utensils size={20} className="mr-2 text-red-400" />}
                        {project.title === 'MMIP Crisis Awareness App' && <Heart size={20} className="mr-2 text-pink-400" />}
                        {project.title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>{project.description}</CardDescription>
                    {project.details && (
                        <ul className="list-disc list-inside mt-2 text-sm">
                            {project.details.map((detail, i) => (
                                <li key={i}>{detail}</li>
                            ))}
                        </ul>
                    )}
                    {project.tags && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {project.tags.map((tag, i) => (
                                <Badge key={i} variant="secondary" className="bg-violet-500 text-white">{tag}</Badge>
                            ))}
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                    <a href={project.link} className="text-violet-400 hover:text-violet-300 transition-colors">View Project</a>
                </CardFooter>
            </Card>
        ))}
    </div>
);

export default Portfolio;

