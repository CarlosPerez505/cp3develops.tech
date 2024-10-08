import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const GetStartedForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        businessName: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [captchaVerified, setCaptchaVerified] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (captchaVerified) {
            // You can replace this with an API call to save the form data.
            console.log('Form submitted:', formData);
            setSubmitted(true);
        } else {
            alert('Please verify the CAPTCHA before submitting the form.');
        }
    };

    const handleCaptchaChange = (value) => {
        setCaptchaVerified(!!value);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    &#x2715;
                </button>
                {submitted ? (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4 text-green-600">Thank you!</h2>
                        <p>We will be in touch with you shortly.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-2xl font-bold mb-6 text-indigo-600">Get Started with Your Free Website!</h2>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                                Phone
                            </label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="businessName">
                                Business Name
                            </label>
                            <input
                                type="text"
                                id="businessName"
                                name="businessName"
                                value={formData.businessName}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                rows="4"
                            />
                        </div>

                        <div className="mb-6">
                            <ReCAPTCHA
                                sitekey="your-site-key-here"
                                onChange={handleCaptchaChange}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 transition"
                            disabled={!captchaVerified}
                        >
                            Submit
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default GetStartedForm;
