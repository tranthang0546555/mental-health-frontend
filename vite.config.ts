import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": [
            "react",
            "react-dom",
            "react-router-dom",
            "react-toastify",
          ],
          "@reduxjs": ["@reduxjs/toolkit"],
        },
      },
    },
    chunkSizeWarningLimit: 1200,
  },
});
