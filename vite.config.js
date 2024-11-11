import { defineConfig } from "vite"; 
import react from "@vitejs/plugin-react"; 

// Exporting the Vite configuration
export default defineConfig({
  plugins: [react()], // Applying the React plugin to the Vite configuration
  base: "/",
  css: {
    preprocessorOptions: {
      scss: {
        // This ensures that the files listed below are available in every SCSS file
        additionalData: `
          @import "./src/assets/styles/components/colors.scss";
          @import "./src/assets/styles/components/mixins.scss";
          @import "./src/assets/styles/components/font.scss";
          @import "./src/assets/styles/components/global.scss";
        `,
      },
    },
  },
});
