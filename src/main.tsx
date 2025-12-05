import React from 'react';
import ReactDOM from 'react-dom/client';
import { Buffer } from 'buffer';
import App from './App';
import './index.css';

// Polyfill Buffer and process for browser (needed by crypto-browserify)
// FIX: Cast window to any to polyfill Buffer without TypeScript errors.
(window as any).Buffer = Buffer;

// Polyfill process globally
(window as any).process = (window as any).process || {
    env: {},
    browser: true,
    version: '',
    versions: {},
    nextTick: (fn: Function) => setTimeout(fn, 0),
    cwd: () => '/',
    platform: 'browser'
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
