import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import fs from 'fs';
import https from 'https';
import http from 'http';
import blogRoutes from './api/routes/blogRoutes.mjs';
import { auth, requiredScopes } from 'express-oauth2-jwt-bearer';

// Create an Express application
const app = express();
const PORT = 5000;
const HOST = '0.0.0.0'; // Allows connections from any IP address

// Check if HTTPS certificates exist
let useHTTPS = false;
let httpsOptions = {};
try {
    httpsOptions = {
        key: fs.readFileSync('/path/to/your/certs/server.key'), // Ensure correct path
        cert: fs.readFileSync('/path/to/your/certs/server.cert'), // Ensure correct path
    };
    useHTTPS = true;
} catch (err) {
    console.warn('HTTPS certificates not found, using HTTP instead.');
}

// Apply Helmet for security headers
app.use(helmet());

// CORS Configuration - Allow both production and localhost
const corsOptions = {
    origin: [
        'http://cp3develops.tech',
        'https://cp3develops.tech',
        'http://localhost:5173',
        'https://localhost:5173',
        'https://www.cp3develops.tech',
    ],
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Apply Rate Limiting (only in production)
if (process.env.NODE_ENV === 'production') {
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
        message: 'Too many requests from this IP, please try again later.',
    });
    app.use(limiter);
}

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// JWT Middleware for admin access (e.g., /blogAdmin)
const jwtCheck = auth({
    audience: 'https://blog-api',
    issuerBaseURL: 'https://dev-6vwc1vuimp18pfg1.us.auth0.com',
    tokenSigningAlg: 'RS256',
});

// Middleware for checking admin permissions on /blogAdmin route
const checkAdminPermissions = requiredScopes('manage:blogs');

// Public route for testing
app.get('/test', (req, res) => {
    res.send('Server is working!');
});

// Public route for /blogs (no JWT required for testing)
app.use('/blogs', blogRoutes);

// Protected route for /blogAdmin (requires 'manage:blogs' permission)
app.get('/blogAdmin', jwtCheck, checkAdminPermissions, (req, res) => {
    res.send('Welcome to the Blog Admin!');
});

// Error-handling middleware (must be at the end)
app.use((err, req, res, next) => {
    console.error('Error:', err.message); // Log the error
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

// Start the server
const server = useHTTPS
    ? https.createServer(httpsOptions, app)
    : http.createServer(app);

server.listen(PORT, HOST, () => {
    console.log(`Server is running on ${useHTTPS ? 'https' : 'http'}://cp3develops.tech:${PORT}`);
});
