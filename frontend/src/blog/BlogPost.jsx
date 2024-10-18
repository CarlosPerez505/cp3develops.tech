import React from 'react';
import { useParams } from 'react-router-dom';

const BlogPost = () => {
    const { id } = useParams(); // Get the post ID from the route parameters

    // Mock data for blog posts (you can replace this with actual data fetching logic)
    const posts = [
        { id: 1, title: 'My First Blog Post', content: 'This is the content of the first blog post.' },
        { id: 2, title: 'Learning React', content: 'This is the content of the second blog post.' },
    ];

    // Find the blog post by ID
    const post = posts.find(post => post.id === parseInt(id));

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
