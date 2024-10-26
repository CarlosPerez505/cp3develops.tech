import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Trash2, Edit, ExternalLink } from 'lucide-react';

const BlogList = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const cardRefs = useRef([]);

    const fetchPosts = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:5000/blogs');
            if (!response.ok) throw new Error('Failed to fetch posts');

            const data = await response.json();
            setPosts(data || []);
        } catch (error) {
            console.error('Error fetching posts:', error);
            setError('Failed to load blog posts. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();

        const handlePostDeleted = () => fetchPosts();
        window.addEventListener('postDeleted', handlePostDeleted);
        return () => window.removeEventListener('postDeleted', handlePostDeleted);
    }, []);

    useEffect(() => {
        if (cardRefs.current.length > 0 && !isLoading) {
            cardRefs.current.forEach((card, index) => {
                if (card) {
                    gsap.fromTo(
                        card,
                        {
                            x: index % 2 === 0 ? -600 : 600,
                            opacity: 0,
                            scale: 0.7,
                        },
                        {
                            x: 0,
                            opacity: 1,
                            scale: 1,
                            duration: 1.2,
                            ease: 'elastic.out(1, 0.6)',
                            delay: index * 0.2,
                        }
                    );
                }
            });
        }
    }, [posts, isLoading]);

    const deleteBlog = async (id, event) => {
        event.preventDefault(); // Prevent navigation
        event.stopPropagation(); // Prevent event bubbling

        if (!window.confirm('Are you sure you want to delete this post?')) {
            return;
        }

        try {
            const response = await fetch(`https://cp3develops.tech/blogs/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to delete post');

            setPosts(prev => prev.filter(post => post.id !== id));

            // Trigger custom event after successful deletion
            window.dispatchEvent(new Event('postDeleted'));
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Failed to delete post. Please try again.');
        }
    };

    const formatPreview = (content) => {
        if (!content) return 'No content available';

        const trimmed = content.trim();
        if (trimmed.length <= 150) return trimmed;

        const preview = trimmed.substring(0, 150);
        return preview.substring(0, preview.lastIndexOf(' ')) + '...';
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 p-6">
                <div className="flex justify-center items-center h-64">
                    <div className="text-gray-400">
                        <div className="w-8 h-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mb-4"></div>
                        <div>Loading posts...</div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 p-6">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-red-500/10 text-red-400 p-4 rounded-lg text-center">
                        {error}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-gray-100 text-center">Blog Posts</h1>

                {posts.length === 0 ? (
                    <div className="text-center text-gray-400 p-8">
                        <p>No posts available yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post, index) => (
                            <article
                                key={post.id}
                                ref={el => cardRefs.current[index] = el}
                                className="bg-gray-800/50 rounded-xl ring-1 ring-gray-700 overflow-hidden hover:ring-blue-500/50 transition-all duration-300"
                            >
                                <Link to={`/blog/${post.id}`} className="block p-6">
                                    <h2 className="text-xl font-semibold mb-3 text-gray-100">
                                        {post.title || 'Untitled Post'}
                                    </h2>

                                    <p className="mb-4 text-gray-400 line-clamp-3">
                                        {formatPreview(post.content)}
                                    </p>

                                    {post.media_url && post.media_type === 'image' && (
                                        <div className="mb-4">
                                            <img
                                                src={post.media_url}
                                                alt={post.title}
                                                className="w-full h-48 object-cover rounded-lg"
                                                onError={(e) => {
                                                    e.target.src = '/api/placeholder/400/300';
                                                    e.target.alt = 'Failed to load image';
                                                }}
                                            />
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
                                            <ExternalLink className="w-4 h-4" />
                                            <span>Read More</span>
                                        </div>

                                        <div className="flex gap-2">
                                        </div>
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogList;
