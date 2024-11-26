import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0", // Expose the app to the network
    port: 5173, // Port you want to use (optional, defaults to 5173)
    watch: {
      usePolling: true, // Force Vite to use polling for file watching (useful in Docker)
    },
  },
  plugins: [react()],
});
