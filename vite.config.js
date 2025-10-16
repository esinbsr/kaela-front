import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // @ = src
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/assets/styles/components/colors.scss";
          @import "@/assets/styles/components/mixins.scss";
          @import "@/assets/styles/components/font.scss";
          @import "@/assets/styles/components/global.scss";
        `,
      },
    },
  },
});
