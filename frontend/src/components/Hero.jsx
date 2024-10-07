import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ toggleTheme, theme }) => {
    // Animation Variants
    const textVariant = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
    };

    const buttonVariant = {
        hover: { scale: 1.1, transition: { duration: 0.3 } },
    };

    const backgroundVariant = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { duration: 2 } },
    };

    return (
        <div className="relative isolate w-full px-6 pt-14 lg:px-8 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 text-white">
            {/* Background gradient and blur with animation */}
            <motion.div
                aria-hidden="true"
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                variants={backgroundVariant}
                initial="hidden"
                animate="visible"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                />
            </motion.div>

            {/* Main content */}
            <div className="mx-auto max-w-7xl py-32 sm:py-48 lg:py-56">
                <motion.div
                    className="text-center"
                    initial="hidden"
                    animate="visible"
                    variants={textVariant}
                >
                    <motion.h1
                        className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
                        variants={textVariant}
                    >
                        Hello, I’m Carlos, a Full Stack Web Developer!
                    </motion.h1>
                    <motion.p
                        className="mt-6 text-lg leading-8 text-gray-100"
                        variants={textVariant}
                    >
                        Let’s bring your vision of a stunning website to life.
                    </motion.p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <motion.a
                            href="#"
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                            whileHover="hover"
                            variants={buttonVariant}
                        >
                            Get Started
                        </motion.a>
                        <motion.a
                            href="#"
                            className="text-sm font-semibold leading-6 text-white"
                            whileHover="hover"
                            variants={buttonVariant}
                        >
                            Learn More <span aria-hidden="true">→</span>
                        </motion.a>
                    </div>
                </motion.div>
            </div>

            {/* Bottom background gradient */}
            <motion.div
                aria-hidden="true"
                className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                variants={backgroundVariant}
                initial="hidden"
                animate="visible"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                />
            </motion.div>
        </div>
    );
};

export default Hero;
