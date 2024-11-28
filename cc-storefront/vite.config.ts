// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [react()],
  build: {
    outDir: 'dist',  // Output folder for Vite build
    ssr: 'src/server.tsx',  // SSR entry point
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/index.html') // Ensure this points to your HTML file
      },
    },
  },
  ssr: {
    external: ['react', 'react-dom'],
  },
  base: '/',
});
