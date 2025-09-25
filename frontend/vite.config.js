import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // important for Docker
    port: 3000, // frontend ko 3000 pe run kare
  },
});
