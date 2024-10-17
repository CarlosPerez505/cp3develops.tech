import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Portfolio from './pages/portfolio.jsx'; // Portfolio page
import BlogList from './blog/BlogList.jsx'; // Blog list component
import BlogPost from './blog/BlogPost.jsx'; // Individual blog post component
import NavBar from './components/NavBar'; // Navbar component in components directory

function App() {
    return (
        <Router>
            <div>
                {/* Add Navbar */}
                <NavBar />

                {/* Define Routes */}
                <Routes>
                    <Route path="/" element={<Portfolio />} />
                    <Route path="/blog" element={<BlogList />} />
                    <Route path="/blog/:id" element={<BlogPost />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
