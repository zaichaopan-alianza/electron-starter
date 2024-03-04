import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config
export default defineConfig({
  resolve: {
    // Some libs that can run in both Web and Node.js, such as `axios`, we need to tell Vite to build them in Node.js.
    browserField: false,
    mainFields: ["module", "jsnext:main", "jsnext"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  },
  define: {
    __DARWIN__: process.platform === "darwin",
    __WIN32__: process.platform === "win32",
    __DEV__: process.env.NODE_ENV === "development",
  },
});
