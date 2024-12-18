import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "", // to have the index.html file import ressources as browser needs (without, it says /assets, which does not work)
  build: {
    outDir: "extension/dist",
    rollupOptions: {
      input: {
        contentScript: fileURLToPath(
          new URL("./src/common/modules/contentScript.ts", import.meta.url),
        ),
        // browserAction: fileURLToPath(new URL("./src/ui/pages/browserAction/index.html", import.meta.url)),
        browserAction: fileURLToPath(
          new URL("./index-browser-action.html", import.meta.url),
        ),
      },
      output: {
        entryFileNames: (entryInfo) => {
          const keepNames = ["contentScript"];
          if (keepNames.includes(entryInfo.name)) {
            return "assets/[name].js";
          }
          return "assets/[name].[hash].js";
        },
      },
    },
  },
});
