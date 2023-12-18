import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueDevTools from "vite-plugin-vue-devtools";
import AutoImport from "unplugin-auto-import/vite";

export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: [
        "vue",
        "vue-router",
        {
          axios: [
            ["default", "axios"], // import { default as axios } from 'axios',
          ],
        },
      ],
      dts: "./auto-imports.d.ts",
      // eslint报错解决
      eslintrc: {
        enabled: false, // Default `false`
        filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
  ],
  optimizeDeps: {
    include: ["axios"],
  },
  server: {
    port: 8019,
    proxy: {
      "/cloud/": {
        target: "http://127.0.0.1:8118/",
        changeOrigin: true,
      },
    },
  },
});
