import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Portfolio from './pages/Portfolio';
import BlogList from './components/BlogList.jsx';
import BlogPost from './components/BlogPost.jsx'; // Import the BlogPost component
import Footer from './components/Footer';
import Login from "@/pages/Login.jsx";

function App() {
    const [theme, setTheme] = useState('dark');

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <Router>
            <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
                <NavBar theme={theme} toggleTheme={toggleTheme} />
                <div className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Portfolio theme={theme} />} />
                        <Route path="/blog" element={<BlogList theme={theme} />} />
                        {/* Add route for individual blog posts */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/blog/:id" element={<BlogPost />} /> {/* This route handles the blog post by ID */}
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
