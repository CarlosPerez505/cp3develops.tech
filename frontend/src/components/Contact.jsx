import React, { useState } from 'react';
import emailjs from 'emailjs-com'; // EmailJS to send emails

const Contact = () => {
    const SERVICE_ID = import.meta.env.VITE_SERVICE_ID || '';
    const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID || '';
    const USER_ID = import.meta.env.VITE_USER_ID || '';
    const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [formStatus, setFormStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

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

        try {
            const token = await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'submit' });

            const response = await fetch('/api/verifyRecaptcha', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });

            const result = await response.json();

            if (result.success) {
                const emailResult = await emailjs.send(
                    SERVICE_ID,
                    TEMPLATE_ID,
                    formData,
                    USER_ID
                );
                setFormStatus('Message sent successfully!');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setFormStatus('reCAPTCHA verification failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setFormStatus('Failed to send the message. Please try again.');
        }
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

                {formStatus && (
                    <p className={`mt-4 text-center text-sm ${formStatus.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
                        {formStatus}
                    </p>
                )}
            </form>
        </div>
    );
};

export default Contact;
