import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Pages
import Portfolio from './pages/portfolio.jsx';
import BlogList from './blog/BlogList.jsx';
import BlogPost from './blog/BlogPost.jsx';

// Components
import NavBar from './components/NavBar';

function App() {
    return (
        <Router>
            <div className="app-container">
                {/* Add Navbar */}
                <NavBar />

                {/* Define Routes */}
                <Routes>
                    <Route path="/" element={<Portfolio />} />
                    <Route path="/blog" element={<BlogList />} />
                    <Route path="/blog/:id" element={<BlogPost />} />
                    {/* Optional: Add a 404 route */}
                    <Route path="*" element={<h1>404 - Page Not Found</h1>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
