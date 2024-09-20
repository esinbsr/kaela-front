import { defineConfig } from 'vite'; // Importing the defineConfig function from Vite
import react from '@vitejs/plugin-react'; // Importing the React plugin for Vite

// Exporting the Vite configuration
export default defineConfig({
  plugins: [react()], // Applying the React plugin to the Vite configuration
  base: './', 
});