import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "", // to have the index.html file import ressources as browser needs (without, it says /assets, which does not work)
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    // browser: "browser",
  },
  build: {
    minify: false,
    terserOptions: {
      compress: false,
      mangle: false,
    },
    outDir: "extension/background",
    rollupOptions: {
      input: {
        background: fileURLToPath(
          new URL("./src/lib/modules/background.ts", import.meta.url),
        ),
        //contentScript: fileURLToPath(
        //  new URL("./src/lib/modules/contentScript.ts", import.meta.url),
        //),
      },
      output: {
        assetFileNames: (assetInfo) => {
          return assetInfo.names[0];
        },
        entryFileNames: (_entryInfo) => {
          //const keepNames = ["contentScript"];
          //if (keepNames.includes(entryInfo.name)) {
          //  return "assets/[name].js";
          //}
          return "[name].js";
          // return "assets/[name].[hash].js";
        },
      },
    },
  },
});
