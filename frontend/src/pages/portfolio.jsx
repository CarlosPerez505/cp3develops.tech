import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Github, Linkedin, Mail, Moon, Sun } from 'lucide-react';
import { Code, Monitor, Server } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import Hero from "../components/Hero.jsx";
import Contact from "@/components/Contact.jsx";

// Lazy load Skills component (optional to optimize bundle)
const Skills = lazy(() => import('@/components/Skills'));

const Portfolio = () => {
    const [theme, setTheme] = useState('dark');
    const [filter, setFilter] = useState('All');

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const projects = [
        {
            title: 'CarlosPerez505.github.io',
            description: 'Config files for my GitHub profile',
            category: 'frontend',
            details: [
                'Public GitHub repository',
                'Built with JavaScript and Tailwind CSS',
                'Showcases various projects and code snippets'
            ],
            tags: ['JavaScript', 'GitHub Pages', 'Portfolio'],
            link: 'https://github.com/CarlosPerez505/CarlosPerez505.github.io' // GitHub link
        },
        {
            title: 'RedPalmProject',
            description: 'Project to raise awareness about missing Indigenous peoples.',
            category: 'fullstack',
            details: [
                'Private repository focused on solving a serious issue',
                'Built with JavaScript, Node.js, and Express',
                'Database handling and API integrations for real-time data'
            ],
            tags: ['Node.js', 'Express', 'Database'],
            link: 'https://github.com/CarlosPerez505/RedPalmProject' // GitHub link
        },
        {
            title: 'nextjs-portfolio',
            description: 'A portfolio built using Next.js.',
            category: 'frontend',
            details: [
                'Static site generated with Next.js',
                'Uses Tailwind CSS for styling',
                'Responsive design with server-side rendering'
            ],
            tags: ['Next.js', 'Tailwind CSS', 'Responsive Design'],
            link: 'https://github.com/CarlosPerez505/nextjs-portfolio' // GitHub link
        },
        {
            title: 'cp3develops.tech',
            description: 'Home page for cp3develops.tech.',
            category: 'frontend',
            details: [
                'Uses modern design principles',
                'Deployed on GitHub Pages',
                'Responsive design'
            ],
            tags: ['Next.js', 'Tailwind CSS'],
            link: 'https://github.com/CarlosPerez505/cp3develops.tech' // GitHub link
        },
        {
            title: 'portfolio-next.js',
            description: 'Portfolio home page for cp3develops.tech.',
            category: 'frontend',
            details: [
                'Built with Next.js and Tailwind CSS',
                'Responsive layout',
                'Shows portfolio projects'
            ],
            tags: ['Next.js', 'Tailwind CSS'],
            link: 'https://github.com/CarlosPerez505/portfolio-next.js' // GitHub link
        },
        {
            title: 'redpalm-next',
            description: 'Next.js project for Red Palm.',
            category: 'fullstack',
            details: [
                'Built with Next.js and Tailwind CSS',
                'Includes user authentication',
                'Responsive layout'
            ],
            tags: ['Next.js', 'Tailwind CSS', 'Node.js'],
            link: 'https://github.com/CarlosPerez505/redpalm-next' // GitHub link
        }
    ];


    const categories = ['All', 'Full Stack', 'Frontend', 'Backend'];

    return (
        <div className={`min-h-screen w-full transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
            <Hero /> {/* Full-width hero section */}
            <div className="container mx-auto max-w-7xl p-6">

                <section className="mb-12">
                    <h2 className="text-3xl font-semibold mb-4 text-center">Featured Projects</h2>
                    {/* Tabs for filtering projects */}
                    <div className="flex justify-center">
                        <Tabs defaultValue="All" onValueChange={(value) => setFilter(value)}>
                            <TabsList className="flex justify-center space-x-4 mb-4">
                                {categories.map(category => (
                                    <TabsTrigger key={category} value={category} className="px-4 py-2 rounded-md">
                                        {category}
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            {/* Project Grid goes inside each TabsContent */}
                            <TabsContent value="All">
                                <ProjectGrid projects={projects} theme={theme}/>
                            </TabsContent>
                            <TabsContent value="Full Stack">
                                <ProjectGrid projects={projects.filter(p => p.category === 'fullstack')} theme={theme}/>
                            </TabsContent>
                            <TabsContent value="Frontend">
                                <ProjectGrid projects={projects.filter(p => p.category === 'frontend')} theme={theme}/>
                            </TabsContent>
                            <TabsContent value="Backend">
                                <ProjectGrid projects={projects.filter(p => p.category === 'backend')} theme={theme}/>
                            </TabsContent>
                        </Tabs>
                    </div>
                </section>

                <section>
                    <Suspense fallback={<div>Loading skills...</div>}>
                        <Skills theme={theme}/>
                    </Suspense>
                </section>

                <section className="mb-12">
                    <Contact/>
                </section>

            </div>

            <footer className="mt-12 text-center text-opacity-60 w-full">
                <p>&copy; 2024 Carlos Perez. All rights reserved.</p>
            </footer>
        </div>
    );
};

const ProjectGrid = ({ projects, theme }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }} // Stagger effect
                >
                    <Card
                        className={`max-w-lg mx-auto ${theme === 'dark' ? 'bg-gray-800 bg-opacity-50 shadow-lg' : 'bg-white bg-opacity-50 shadow-md'} border-none transform hover:scale-105 transition-transform duration-300`}
                    >
                        <CardHeader>
                            <CardTitle className="flex items-center justify-center">
                                {project.category === 'frontend' && <Monitor size={20} className="mr-2 text-green-400" />}
                                {project.category === 'backend' && <Server size={20} className="mr-2 text-blue-400" />}
                                {project.category === 'fullstack' && <Code size={20} className="mr-2 text-purple-400" />}
                                {project.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>{project.description}</CardDescription>
                            <ul className="list-disc list-inside mt-2 text-sm">
                                {project.details.map((detail, i) => (
                                    <li key={i}>{detail}</li>
                                ))}
                            </ul>
                            <div className="flex flex-wrap gap-2 mt-4 justify-center">
                                {project.tags.map((tag, i) => (
                                    <Badge key={i} variant="secondary" className="bg-violet-500 text-white">{tag}</Badge>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <a href={project.link} className="text-violet-400 hover:text-violet-300 transition-colors">View Project</a>
                        </CardFooter>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
};

export default Portfolio;
