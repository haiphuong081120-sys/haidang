import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');

    return {
        // Base must be '/' for shared hosting root deployment
        base: '/',
        plugins: [
            react(),
        ],
        build: {
            // Output to 'dist' folder. You will copy the contents of 'dist' to 'public_html'
            outDir: 'dist',
            emptyOutDir: true,
            manifest: true, // Generate manifest.json for Laravel to locate hashed files if needed
            rollupOptions: {
                input: 'src/main.tsx',
                output: {
                    // Organize assets into subfolders to keep public_html clean
                    entryFileNames: `assets/js/[name]-[hash].js`,
                    chunkFileNames: `assets/js/[name]-[hash].js`,
                    assetFileNames: `assets/[ext]/[name]-[hash].[ext]`
                }
            }
        },
        server: {
            port: 3000,
            host: '0.0.0.0',
        },
        define: {
            'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY || ''),
            'process.env.NODE_ENV': JSON.stringify(mode),
            global: 'globalThis',
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
                crypto: 'crypto-browserify',
                stream: 'stream-browserify',
                buffer: 'buffer',
                events: 'events',
                vm: 'vm-browserify',
            },
        },
        optimizeDeps: {
            include: ['events', 'buffer'],
            esbuildOptions: {
                define: {
                    global: 'globalThis',
                },
            },
        },
    };
});