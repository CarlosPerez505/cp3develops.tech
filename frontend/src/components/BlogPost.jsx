import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BlogPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            setIsLoading(true);
            setError(null);
            try {
                console.log(`Fetching post with ID: ${id}`); // Debug line
                const response = await fetch(`http://localhost:5000/blogs/${id}`);
                if (!response.ok) {
                    throw new Error(response.status === 404 ? 'Post not found' : 'Failed to fetch post');
                }

                const data = await response.json();
                console.log('Fetched post data:', data); // Debug line

                if (data && data.title && data.content) {
                    setPost(data);
                } else {
                    setError('Invalid post data');
                }
            } catch (error) {
                console.error('Error fetching post:', error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchPost();
        }
    }, [id]);

    const formatDate = (timestamp) => {
        if (!timestamp) return null;

        const date = new Date(timestamp);
        if (isNaN(date.getTime())) return null;

        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatContent = (content) => {
        if (!content) return 'No content available';
        return content.split('\n').map((paragraph, index) => (
            paragraph.trim() && (
                <p key={index} className="mb-4">
                    {paragraph}
                </p>
            )
        ));
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <div className="text-center text-gray-400">
                    <div className="mb-2">Loading...</div>
                    <div className="w-8 h-8 border-t-2 border-b-2 border-gray-400 rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-500/10 text-red-400 p-4 rounded-lg text-center">
                    {error}
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-gray-800/50 text-gray-400 p-4 rounded-lg text-center">
                    Post not found
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 py-8">
            <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                <div className="rounded-xl bg-gray-800/50 p-6 ring-1 ring-gray-700">
                    {/* Header */}
                    <header className="mb-6">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-4">
                            {post.title}
                        </h1>

                        {formatDate(post.created_at) && (
                            <div className="text-sm text-gray-400">
                                Posted on: {formatDate(post.created_at)}
                            </div>
                        )}
                    </header>

                    {/* Content */}
                    <div className="prose prose-invert prose-gray max-w-none">
                        {formatContent(post.content)}
                    </div>

                    {/* Media Section */}
                    {post.media_url && post.media_type && post.media_type !== 'none' && (
                        <div className="mt-8 rounded-lg bg-gray-800/50 p-4">
                            <h2 className="text-lg font-semibold text-gray-200 mb-3">
                                {post.media_type === 'image' ? 'Featured Image' : 'Featured Media'}
                            </h2>
                            {post.media_type === 'image' ? (
                                <img
                                    src={post.media_url}
                                    alt={post.title}
                                    className="rounded-lg max-h-96 w-auto mx-auto"
                                    onError={(e) => {
                                        e.target.src = '/api/placeholder/400/300';
                                        e.target.alt = 'Failed to load image';
                                    }}
                                />
                            ) : (
                                <div className="text-gray-400">
                                    Media URL: <a href={post.media_url} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">{post.media_url}</a>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </article>
        </div>
    );
};

export default BlogPost;
