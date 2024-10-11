import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import emailjs from 'emailjs-com';
import SubmitButton from "@/components/ui/SubmitButton.jsx";

const Contact = () => {
    const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
    const USER_ID = import.meta.env.VITE_USER_ID;
    const RECAPTCHA_SITEKEY = import.meta.env.VITE_RECAPTCHA_SITEKEY;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [formStatus, setFormStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (captchaVerified) {
            setLoading(true);
            emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID)
                .then((result) => {
                    console.log(result.text);
                    setFormStatus('Message sent successfully!');
                    setFormData({ name: '', email: '', message: '' });
                }, (error) => {
                    console.error(error.text);
                    setFormStatus('Failed to send the message. Please try again later.');
                })
                .finally(() => setLoading(false));
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
                        sitekey={RECAPTCHA_SITEKEY}
                        onChange={handleCaptchaChange}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <SubmitButton loading={loading} />
                </div>
            </form>

            {formStatus && (
                <p className={`mt-4 text-center text-sm ${formStatus.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
                    {formStatus}
                </p>
            )}
        </div>
    );
};

export default Contact;
