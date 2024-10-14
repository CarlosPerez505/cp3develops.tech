export default async function handler(req, res) {
    const SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY; // Use Vercel environment variable
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ success: false, message: 'Token is missing' });
    }

    try {
        const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `secret=${SECRET_KEY}&response=${token}`,
        });

        const data = await response.json();

        if (data.success) {
            return res.status(200).json({ success: true, message: 'reCAPTCHA verified' });
        } else {
            return res.status(400).json({ success: false, message: 'Invalid reCAPTCHA token' });
        }
    } catch (error) {
        console.error('Error during reCAPTCHA verification:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}
