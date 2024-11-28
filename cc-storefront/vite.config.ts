import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173,
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [react()],
  build: {
    outDir: "dist",  // Output folder
    ssr: "src/server.tsx", // SSR entry point (optional if using SSR)
    rollupOptions: {
      input: "src/index.html", // Ensure index.html is included
    },
  },
  ssr: {
    external: ["react", "react-dom"],
  },
  base: "/",  // Ensure this is set to the correct base URL
});
