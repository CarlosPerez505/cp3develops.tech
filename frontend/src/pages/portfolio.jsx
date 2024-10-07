import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Moon, Sun } from 'lucide-react';
import { Code, Monitor, Server } from 'lucide-react';
import { motion } from 'framer-motion'; // Import Framer Motion
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import Skills from '@/components/Skills';
import Hero from "../components/Hero.jsx";
import Contact from "@/components/Contact.jsx";

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
            title: 'MMIP Crisis Awareness App',
            description: 'A full-stack application aimed at raising awareness and providing resources for the Missing and Murdered Indigenous Peoples crisis.',
            category: 'fullstack',
            details: [
                'Developed using modern full-stack technologies',
                'Features data visualization of MMIP statistics',
                'Includes a resource directory for affected communities',
                'Implements user authentication and data security measures',
                'Integrates with external APIs for real-time data',
                'Responsive design for accessibility on various devices',
            ],
            tags: ['React', 'Node.js', 'MySQL', 'Express', 'Data Visualization', 'API Integration'],
        },
        {
            title: 'BBQ Restaurant Website',
            description: 'A mobile-friendly BBQ restaurant website built with React and Tailwind CSS, featuring a parallax effect, interactive menu carousel, and embedded Google Maps.',
            category: 'frontend',
            details: [
                'Implemented using React and Tailwind CSS',
                'Features a parallax scrolling effect for visual appeal',
                'Includes an interactive menu carousel for easy navigation',
                'Integrates Google Maps for location display',
                'Responsive layout for optimal viewing on various devices',
            ],
            tags: ['React', 'Tailwind CSS', 'Responsive Design', 'Google Maps API'],
        },
    ];

    const categories = ['All', 'Full Stack', 'Frontend', 'Backend'];

    return (
        <div className={`min-h-screen w-full transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
            <Hero /> {/* Full-width hero section */}
            <div className="container mx-auto max-w-7xl p-6">

                <section className="mb-16"> {/* Increased margin-bottom */}
                    <h2 className="text-3xl font-semibold mb-8 text-center">Featured Projects</h2> {/* Increased bottom margin */}
                    {/* Tabs for filtering projects */}
                    <div className="flex justify-center">
                        <Tabs defaultValue="All" onValueChange={(value) => setFilter(value)}>
                            <TabsList className="flex justify-center space-x-4 mb-8"> {/* Increased margin-bottom */}
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

                <motion.section
                    className="py-16" // Added padding for top and bottom
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <Skills theme={theme} />
                </motion.section>

                <motion.section
                    className="mb-16 py-16" // Increased padding and margin for separation
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <Contact />
                </motion.section>

            </div>

            <footer className="mt-16 text-center text-opacity-60 w-full"> {/* Increased top margin */}
                <p>&copy; 2024 Carlos Perez. All rights reserved.</p>
            </footer>
        </div>
    );
};

const ProjectGrid = ({ projects, theme }) => {
    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } }
            }}
        >
            {projects.map((project, index) => (
                <motion.div key={index} variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}>
                    <Card className={`max-w-lg mx-auto ${theme === 'dark' ? 'bg-gray-800 bg-opacity-50 shadow-lg' : 'bg-white bg-opacity-50 shadow-md'} border-none transform hover:scale-105 transition-transform duration-300`}>
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
        </motion.div>
    );
};

export default Portfolio;
