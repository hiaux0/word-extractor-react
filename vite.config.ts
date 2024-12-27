import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import commonjs from "vite-plugin-commonjs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), commonjs()],
  base: "", // to have the index.html file import ressources as browser needs (without, it says /assets, which does not work)
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // sourcemap: true,
    minify: false,
    terserOptions: {
      compress: false,
      mangle: false,
    },
    outDir: "extension/dist",
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          return assetInfo.names[0];
        },
        entryFileNames: (_entryInfo) => {
          //const keepNames = ["contentScript"];
          //if (keepNames.includes(entryInfo.name)) {
          //  return "assets/[name].js";
          //}
          return "assets/[name].js";
          // return "assets/[name].[hash].js";
        },
      },
    },
  },
});
