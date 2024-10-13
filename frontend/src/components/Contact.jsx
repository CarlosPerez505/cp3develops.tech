import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const Contact = () => {
    const SERVICE_ID = import.meta.env.VITE_SERVICE_ID || '';
    const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID || '';
    const USER_ID = import.meta.env.VITE_USER_ID || '';
    const RECAPTCHA_SITE_KEY = '6Lc5CGAqAAAAAGqgbFMrgO9f1b-KF5Qm03tda9JT'; // Your site key

    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [formStatus, setFormStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = await executeRecaptcha('submit'); // Get reCAPTCHA token
            console.log('reCAPTCHA token:', token);

            // Send the form with the token to EmailJS
            await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
                ...formData,
                'g-recaptcha-response': token,
            }, USER_ID);

            setFormStatus('Message sent successfully!');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Error:', error);
            setFormStatus('Failed to send the message.');
        } finally {
            setLoading(false);
        }
    };

    const executeRecaptcha = async (action) => {
        return new Promise((resolve, reject) => {
            grecaptcha.ready(() => {
                grecaptcha.execute(RECAPTCHA_SITE_KEY, { action }).then(resolve).catch(reject);
            });
        });
    };

    return (
        <div className="contact-form">
            <h2>Contact Me</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
                <textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Send'}
                </button>
            </form>
            {formStatus && <p>{formStatus}</p>}
        </div>
    );
};

export default Contact;
