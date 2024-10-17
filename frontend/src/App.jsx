import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Portfolio from './pages/portfolio.jsx';
import BlogList from './blog/BlogList.jsx';
import BlogPost from './blog/BlogPost.jsx';

// Components
import NavBar from './components/NavBar';
import Footer from "@/components/Footer.jsx";

function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                {/* Add Navbar */}
                <NavBar />

                {/* Main content area with flex-grow to fill available space */}
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Portfolio />} />
                        <Route path="/blog" element={<BlogList />} />
                        <Route path="/blog/:id" element={<BlogPost />} />
                        {/* Optional: Add a 404 route */}
                        <Route path="*" element={<h1 className="text-center text-xl py-6">404 - Page Not Found</h1>} />
                    </Routes>
                </main>

                {/* Footer at the bottom */}
                <Footer />
            </div>
        </Router>
    );
}

export default App;
