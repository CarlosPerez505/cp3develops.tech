import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    base:'CarlosPerez505.github.io',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'), // Maps @ to the src directory
        },
    },
});
