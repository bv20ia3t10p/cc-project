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
    outDir: "dist", // Output folder for Vite build
    ssr: "src/server.tsx", // SSR entry point (optional for SSR)
    rollupOptions: {
      input: path.resolve(__dirname, "src/index.html"), // Ensuring index.html is included in the build
      output: {
        // This will ensure TypeScript files don't get copied to the dist folder
        // or be included in the final build output.
        assetFileNames: ({ name }) => {
          if (name && name.endsWith(".ts")) {
            return ""; // Prevent .ts files from being written to the dist folder
          }
          return "assets/[name].[hash][extname]";
        },
      },
    },
    // You can also specify whether or not to include source maps for TypeScript files
    sourcemap: false,
  },
  ssr: {
    external: ["react", "react-dom"],
  },
  base: "/",
});
