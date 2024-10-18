import React from 'react';
import { useParams } from 'react-router-dom';
import { posts } from './Data.jsx'; // Import the blog posts data from Data.jsx

const BlogPost = () => {
    const { id } = useParams(); // Get the post ID from the URL
    const post = posts.find((post) => post.id === parseInt(id)); // Find the post by ID

    // If no post is found with the given ID
    if (!post) {
        return <div className="p-6 text-center">Post not found</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-lg">{post.content}</p>
        </div>
    );
};

export default BlogPost;
