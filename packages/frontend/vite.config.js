import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', 
  server: {
    open: true, 
  },
  build: {
    outDir: "dist", // Default build directory
  },
  publicDir: "public", // Public directory
  assetsInclude: ["**/staticwebapp.config.json"], // Ensure Vite recognizes it
});
