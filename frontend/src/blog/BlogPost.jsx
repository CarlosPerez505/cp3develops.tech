// blog/BlogPost.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const BlogPost = () => {
    const { id } = useParams();
    const post = {
        1: { title: 'My First Blog Post', content: 'This is the content of the first post.' },
        2: { title: 'Learning React', content: 'React is a powerful library for building UIs.' },
    }[id];

    return (
        <div className="p-4">
            {post ? (
                <>
                    <h1 className="text-xl font-bold">{post.title}</h1>
                    <p>{post.content}</p>
                </>
            ) : (
                <p>Post not found</p>
            )}
        </div>
    );
};

export default BlogPost;
