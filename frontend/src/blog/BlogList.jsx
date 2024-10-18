import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const BlogList = () => {
    const posts = [
        { id: 1, title: 'My First Blog Post' },
        { id: 2, title: 'Learning React' },
    ];

    const postRefs = useRef([]); // Ref for all the blog post list items

    useEffect(() => {
        postRefs.current.forEach((post, index) => {
            const handleMouseMove = (e) => {
                const { clientX, clientY } = e;
                const { offsetWidth: width, offsetHeight: height } = post;
                const centerX = post.offsetLeft + width / 2;
                const centerY = post.offsetTop + height / 2;

                const deltaX = clientX - centerX;
                const deltaY = clientY - centerY;

                const rotateY = ((deltaX / width) * -30); // Adjust the rotation on the Y-axis
                const rotateX = ((deltaY / height) * 30); // Adjust the rotation on the X-axis

                gsap.to(post, {
                    rotateY,
                    rotateX,
                    scale: 1.1, // Increase the scaling for depth
                    duration: 0.3,
                    ease: 'power1.out',
                    boxShadow: '0px 20px 50px rgba(0, 0, 0, 0.8)', // Dramatic shadow for 3D effect
                });
            };

            const handleMouseLeave = () => {
                gsap.to(post, {
                    rotateY: 0,
                    rotateX: 0,
                    scale: 1, // Reset to original size
                    duration: 0.5,
                    ease: 'power1.out',
                    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', // Reset shadow
                });
            };

            post.addEventListener('mousemove', handleMouseMove);
            post.addEventListener('mouseleave', handleMouseLeave);

            // Cleanup event listeners when the component unmounts
            return () => {
                post.removeEventListener('mousemove', handleMouseMove);
                post.removeEventListener('mouseleave', handleMouseLeave);
            };
        });
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Blog</h1>
            <ul className="space-y-4">
                {posts.map((post, index) => (
                    <li
                        key={post.id}
                        ref={(el) => (postRefs.current[index] = el)} // Attach each post to the ref
                        className="bg-gray-800 text-white p-4 rounded-lg shadow-lg cursor-pointer transform transition-transform duration-300"
                        style={{ perspective: '1000px' }} // Add perspective for 3D effect
                    >
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
