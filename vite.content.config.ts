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
    outDir: "extension/dist",
    rollupOptions: {
      input: {
        contentScript: fileURLToPath(
          new URL("./src/lib/modules/contentScript.ts", import.meta.url),
        ),
      },
      output: {
        assetFileNames: (assetInfo) => {
          return assetInfo.names[0];
        },
        entryFileNames: (_entryInfo) => {
          return "assets/[name].js";
        },
      },
    },
  },
});
