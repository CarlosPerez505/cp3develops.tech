import React from 'react';
import BlogList from '../components/BlogList'; // Updated import path

const Blog = () => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold text-center mb-6">Blog</h1>
            <BlogList />
        </div>
    );
};

export default Blog;
