import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GetStartedButton from "@/components/GetStartedButton.jsx";
import GetStartedForm from "@/components/GetStartedForm.jsx";

const FreeWebsitePromo = () => {
    const [showPromo, setShowPromo] = useState(false);
    const [showGetStartedForm, setShowGetStartedForm] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 5000) {
                setShowPromo(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleGetStartedClick = () => {
        setShowGetStartedForm(true);
    };

    const closeGetStartedForm = () => {
        setShowGetStartedForm(false);
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
