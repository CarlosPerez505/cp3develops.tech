// blog/BlogList.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const BlogList = () => {
    const posts = [
        { id: 1, title: 'My First Blog Post' },
        { id: 2, title: 'Learning React' },
    ];

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Blog</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link to={`/blog/${post.id}`} className="text-blue-500 hover:underline">
                            {post.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogList;
