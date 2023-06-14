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
            "react-redux",
          ],
          "@reduxjs": ["@reduxjs/toolkit"],
          "@ckeditor": [
            "@ckeditor/ckeditor5-build-classic",
            "@ckeditor/ckeditor5-react",
          ],
          "@mui": [
            "@mui/icons-material",
            "@mui/material",
            "material-react-table",
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1200,
  },
});
