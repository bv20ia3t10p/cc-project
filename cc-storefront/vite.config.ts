import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "0.0.0.0", // Expose the app to the network (useful for Docker)
    port: 5173, // Port you want to use (optional, defaults to 5173)
    watch: {
      usePolling: true, // Force Vite to use polling for file watching (useful in Docker)
    },
    middlewareMode: true, // Enable SSR middleware mode
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Alias for src directory
    },
  },
  plugins: [react()],
  build: {
    outDir: "dist", // Output directory for build
    ssr: "src/server.tsx", // SSR entry point (server-side entry)
    rollupOptions: {
      input: "src/index.html", // Client-side entry point
    },
  },
  ssr: {
    // Ensure SSR build points to the correct external libraries
    external: ["react", "react-dom"],
  },
  base: "/", // Base URL for deployment (ensure this is correct)
});
