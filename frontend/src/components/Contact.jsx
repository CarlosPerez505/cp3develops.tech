import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha'; // Google reCAPTCHA
import emailjs from 'emailjs-com';

const Contact = () => {
    const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
    const USER_ID = import.meta.env.VITE_USER_ID;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',

    });
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [formStatus, setFormStatus] = useState(''); // State for form submission status
    console.log(SERVICE_ID, TEMPLATE_ID, USER_ID);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (captchaVerified) {
            emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID)
                .then((result) => {
                    console.log(result.text);
                    setFormStatus('Message sent successfully!');
                    setFormData({ name: '', email: '', message: '' }); // Clear form
                }, (error) => {
                    console.error(error.text);
                    setFormStatus('Failed to send the message. Please try again later.');
                });
        } else {
            alert('Please verify the CAPTCHA before submitting the form.');
        }
    };

    const handleCaptchaChange = (value) => {
        setCaptchaVerified(!!value);
    };

    return (
        <div className="bg-white shadow-md rounded px-4 sm:px-8 pt-6 pb-8 mb-4 w-full max-w-lg mx-auto">
            <h2 className="text-3xl font-bold mb-6">Contact Me</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Your name"
                        aria-label="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Your email"
                        aria-label="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Your message"
                        aria-label="Message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <ReCAPTCHA
                        sitekey="6LdWsJ8eAAAAALELblpqCXNgQiCl-HWMjF0eL11G"
                        onChange={handleCaptchaChange}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        disabled={!captchaVerified}
                    >
                        Send Message
                    </button>
                </div>
            </form>

            {formStatus && (
                <p className="mt-4 text-center text-sm text-green-500">{formStatus}</p>
            )}
        </div>
    );
};

export default Contact;