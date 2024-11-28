import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0", // Expose the app to the network
    port: 5173, // Port you want to use (optional, defaults to 5173)
    watch: {
      usePolling: true, // Force Vite to use polling for file watching (useful in Docker)
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // This maps `@` to the `src` directory
    },
  },
  plugins: [react()],
  build: {
    outDir: "dist", // Ensure the build files are placed in the 'dist' folder
    ssr: "src/server.tsx", // Specify the entry point for SSR
    rollupOptions: {
      input: "src/index.html", // Entry point for the client-side
    },
  },
  base: "/", // Base URL for deployment
});
