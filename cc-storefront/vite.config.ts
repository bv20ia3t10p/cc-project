import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  server: {
    host: '0.0.0.0', // Expose the app to the network
    port: 5173, // Port for dev server
    watch: {
      usePolling: true, // Useful for Docker or network file systems
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Alias for src folder
    },
  },
  build: {
    outDir: 'dist', // Output directory for build
    ssr: 'src/server-entry.tsx', // SSR entry point for server-side rendering
    rollupOptions: {
      input: 'src/index.html', // Ensure index.html is included in the build process
    },
  },
  ssr: {
    external: ['react', 'react-dom'], // Externalize react and react-dom for SSR
  },
  base: '/', // Base URL for deployment
});
