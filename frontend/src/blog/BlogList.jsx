import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { posts } from '@/blog/Data.jsx'; // Assuming posts data is stored in Data.jsx

const BlogList = () => {
    const cardRefs = useRef([]); // Ref for storing multiple card references

    useEffect(() => {
        cardRefs.current.forEach((card) => {
            const handleMouseMove = (e) => {
                const { clientX, clientY } = e;
                const { offsetWidth: width, offsetHeight: height } = card;
                const centerX = card.offsetLeft + width / 2;
                const centerY = card.offsetTop + height / 2;

                const deltaX = clientX - centerX;
                const deltaY = clientY - centerY;

                // Calculate the rotation based on the mouse position
                const rotateX = (deltaY / height) * 20; // More dramatic effect
                const rotateY = (deltaX / width) * -20;

                gsap.to(card, {
                    rotateX,
                    rotateY,
                    scale: 1.1, // Increased scaling effect
                    duration: 0.3,
                    ease: 'power1.out',
                });
            };

            const handleMouseLeave = () => {
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    scale: 1, // Reset to original state
                    duration: 0.5,
                    ease: 'power1.out',
                });
            };

            // Attach event listeners
            card.addEventListener('mousemove', handleMouseMove);
            card.addEventListener('mouseleave', handleMouseLeave);

            // Clean up event listeners on unmount
            return () => {
                card.removeEventListener('mousemove', handleMouseMove);
                card.removeEventListener('mouseleave', handleMouseLeave);
            };
        });
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Blog Posts</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: '1500px' }}>
                {posts.map((post, index) => (
                    <div
                        key={post.id}
                        ref={(el) => (cardRefs.current[index] = el)} // Attach each card to the ref
                        className="bg-gray-800 text-white p-6 rounded-lg shadow-lg cursor-pointer transform transition-transform duration-300 hover:shadow-2xl"
                    >
                        <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
                        <p className="mb-4">{post.excerpt}</p>
                        <Link to={`/blog/${post.id}`} className="text-blue-500 hover:underline">
                            Read More
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogList;
