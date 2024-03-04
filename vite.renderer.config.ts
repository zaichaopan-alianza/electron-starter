import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main_window: path.join(__dirname, "main-window.html"),
      },
    },
  },
  define: {
    __DARWIN__: process.platform === "darwin",
    __WIN32__: process.platform === "win32",
    __DEV__: process.env.NODE_ENV === "development",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
