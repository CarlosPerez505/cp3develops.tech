import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const Contact = () => {
    const SERVICE_ID = import.meta.env.VITE_SERVICE_ID || '';
    const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID || '';
    const USER_ID = import.meta.env.VITE_USER_ID || '';
    const RECAPTCHA_SITE_KEY = '6Lc5CGAqAAAAAGqgbFMrgO9f1b-KF5Qm03tda9JT'; // Your site key

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [errors, setErrors] = useState({});
    const [formStatus, setFormStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        let formErrors = {};
        let valid = true;

        if (!formData.name.trim()) {
            formErrors.name = 'Name is required';
            valid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            formErrors.email = 'Email is required';
            valid = false;
        } else if (!emailRegex.test(formData.email)) {
            formErrors.email = 'Invalid email format';
            valid = false;
        }

        if (!formData.message.trim()) {
            formErrors.message = 'Message is required';
            valid = false;
        }

        setErrors(formErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        try {
            const token = await executeRecaptcha('submit'); // Get reCAPTCHA token
            console.log('reCAPTCHA token:', token);

            const form = document.getElementById('contact-form');
            const result = await emailjs.sendForm(
                SERVICE_ID,
                TEMPLATE_ID,
                form,
                USER_ID,
                { 'g-recaptcha-response': token } // Send token with the request
            );

            console.log('Email sent:', result.text);
            setFormStatus('Message sent successfully!');
            setFormData({ name: '', email: '', message: '' });
            setErrors({});
        } catch (error) {
            console.error('Error:', error);
            setFormStatus(`Failed to send the message: ${error.text || 'Unknown error'}`);
        } finally {
            setLoading(false);
        }
    };

    const executeRecaptcha = async (action) => {
        return new Promise((resolve, reject) => {
            grecaptcha.enterprise.ready(() => {
                grecaptcha.enterprise
                    .execute(RECAPTCHA_SITE_KEY, { action })
                    .then(resolve)
                    .catch(reject);
            });
        });
    };

    return (
        <div className="bg-white shadow-md rounded px-4 sm:px-8 pt-6 pb-8 mb-4 w-full max-w-lg mx-auto">
            <h2 className="text-3xl font-bold mb-6">Contact Me</h2>

            <form onSubmit={handleSubmit} id="contact-form">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            errors.name ? 'border-red-500' : ''
                        }`}
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            errors.email ? 'border-red-500' : ''
                        }`}
                        placeholder="Your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            errors.message ? 'border-red-500' : ''
                        }`}
                        placeholder="Your message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Send Message'}
                    </button>
                </div>
            </form>

            {formStatus && (
                <p
                    className={`mt-4 text-center text-sm ${
                        formStatus.includes('successfully') ? 'text-green-500' : 'text-red-500'
                    }`}
                >
                    {formStatus}
                </p>
            )}
        </div>
    );
};

export default Contact;
