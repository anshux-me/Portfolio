import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'ogl': ['ogl']
        }
      }
    }
  },
  server: {
    port: 5173,
    open: true,
    allowedHosts: [
      'zit-issue-rebuilt.ngrok-free.dev',
      'localhost',
      '127.0.0.1'
    ],
    cors: {
      origin: [
        'https://zit-issue-rebuilt.ngrok-free.dev',
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        // Add other allowed origins here
      ],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }
  }
});