import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom', 'react-toastify', 'react-redux'],
          '@reduxjs': ['@reduxjs/toolkit'],
          '@ckeditor': ['@ckeditor/ckeditor5-build-classic', '@ckeditor/ckeditor5-react'],
          '@mui': ['@mui/icons-material', '@mui/material', 'material-react-table']
        }
      }
    },
    chunkSizeWarningLimit: 1200
  },
  define: {
    global: 'globalThis'
  },
  resolve: {
    alias: {
      'readable-stream': 'vite-compatible-readable-stream'
    }
  }
})
