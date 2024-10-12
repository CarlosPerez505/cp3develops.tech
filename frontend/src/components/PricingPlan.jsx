import React from 'react';
import { motion } from 'framer-motion';
import GetStartedButton from "@/components/GetStartedButton.jsx";

const PricingPlan = ({ theme, onGetStartedClick }) => {
    const plans = [
        {
            name: 'Launch Plan',
            price: '$250/month',
            description:
                'An opportunity for new businesses to get a high-quality website up and running with very little upfront cost.',
            features: [
                'Custom Website Design',
                'Purchase a domain and hosting (Godaddy, Namecheap, etc.)',
                'GitHub Pages (free)',
                'Powered by Your Company Badge',
            ],
            buttonLabel: 'Get Started',
        },
        {
            name: 'Growth Plan',
            price: '$350+/month',
            description:
                'Perfect for growing businesses that need ongoing support and improvements.',
            features: [
                'Website Maintenance & Updates',
                'SEO Optimization',
                'Content Changes & New Features',
            ],
            buttonLabel: 'Choose Growth',
        },
        {
            name: 'Premium Plan',
            price: '$500+/month',
            description:
                'The ultimate package for businesses that want premium ongoing design, features, and marketing support.',
            features: [
                'Advanced Analytics & Reporting',
                'Ongoing Design Improvements',
                'Full Support & Marketing Features',
            ],
            buttonLabel: 'Choose Premium',
        },
    ];

    const handleGetStartedClick = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className={`p-8 ${theme === 'dark' ? 'bg-dark-gradient' : 'bg-light-gradient'} text-white`}>
            <h2 className="text-4xl font-bold text-center mb-12">Our Pricing Plans</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {plans.map((plan, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        className="plan-card p-6 bg-white text-gray-900 rounded-lg shadow-md"
                    >
                        <h3 className="text-2xl font-bold mb-4 text-red-700">{plan.name}</h3>
                        <p className="text-xl font-semibold mb-4">{plan.price}</p>
                        <p className="mb-6 text-gray-700">{plan.description}</p>
                        <ul className="mb-6 space-y-2">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-center">
                                    <span className="text-green-600 mr-2">&#10003;</span> {feature}
                                </li>
                            ))}
                        </ul>
                        {/* The button will trigger the scroll to the contact form */}
                        <GetStartedButton onClick={handleGetStartedClick} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PricingPlan;
