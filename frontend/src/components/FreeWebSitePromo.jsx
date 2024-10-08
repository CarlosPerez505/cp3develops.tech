import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GetStartedButton from "@/components/GetStartedButton.jsx";
import GetStartedForm from "@/components/GetStartedForm.jsx";

const FreeWebsitePromo = () => {
    const [showPromo, setShowPromo] = useState(false);
    const [showGetStartedForm, setShowGetStartedForm] = useState(false);
    const promoTimers = [100000, 50000, 100000]; // 10s, 20s, 30s delays

    useEffect(() => {
        let timeouts = [];

        // Set timeouts based on promoTimers array
        promoTimers.forEach((delay, index) => {
            const timeout = setTimeout(() => {
                setShowPromo(true);
            }, delay);
            timeouts.push(timeout);
        });

        // Cleanup timeouts when the component unmounts
        return () => {
            timeouts.forEach((timeout) => clearTimeout(timeout));
        };
    }, []); // Empty dependency array to run only once

    const handleGetStartedClick = () => {
        setShowGetStartedForm(true);
        setShowPromo(false); // Close the promo when the form pops up
    };

    const closeGetStartedForm = () => {
        setShowGetStartedForm(false);
    };

    const closePromo = () => {
        setShowPromo(false);
    };

    return (
        <>
            {showPromo && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed bottom-10 right-10 bg-white p-6 rounded-lg shadow-lg max-w-xs w-full sm:w-auto z-50 overflow-hidden"
                    style={{ zIndex: 1000 }}
                >
                    <button
                        onClick={closePromo}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    >
                        &#x2715;
                    </button>
                    <h3 className="text-xl font-bold mb-4 text-indigo-600">Get a Free Website for 3 Months!</h3>
                    <p className="mb-4 text-gray-700">
                        We are offering new small businesses a professionally designed website absolutely free for the first
                        3 months. Let us help you get online and grow your business!
                    </p>
                    <div className="mt-6 flex items-center justify-center gap-x-6 flex-wrap">
                        <GetStartedButton onClick={handleGetStartedClick} />
                    </div>
                </motion.div>
            )}

            {showGetStartedForm && (
                <GetStartedForm onClose={closeGetStartedForm} />
            )}
        </>
    );
};

export default FreeWebsitePromo;
