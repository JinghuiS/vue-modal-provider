import { defineConfig } from "vite";
import * as path from "path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  build: {
    target: "es2015",
    lib: {
      entry: "src/index.ts",
      name: "vue-modal-provider",
      formats: ["es", "cjs"],
      fileName: (format) => `vue-modal-provider.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue"],
      output: {
        preserveModulesRoot: path.resolve(__dirname, "src/index.ts"),
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
