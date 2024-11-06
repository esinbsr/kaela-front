import { defineConfig } from 'vite'; 
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()], 
  base: '/esin/',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/assets/styles/components/colors.scss";
          @import "./src/assets/styles/components/mixins.scss";
          @import "./src/assets/styles/components/font.scss";
          @import "./src/assets/styles/components/global.scss";
        `
      },
    },
  },
});