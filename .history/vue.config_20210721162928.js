import { resolve } from "path";
import { resolve as _resolve } from "path";

export default {
  publicPath: "/",
  assetsDir: "static",
  outputDir: "dist",
  lintOnSave: true,
  devServer: {
    hot: true,
    port: 9999,
    open: true,
    noInfo: false,
    overlay: {
      warnings: true,
      errors: true,
    },
    proxy: {
      '/': {
        target: `http://192.168.17.244:18098`,
        // target: `http://192.168.17.12:8770`,
        // target: `http://192.168.17.10:8770`,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          ['^' + baseURL]: '',
        },
      },
    },
  },
  configureWebpack() {
    return {
      resolve: {
        alias: {
          "@": resolve("src"),
          "*": resolve(""),
          Assets: resolve("src/assets"),
        },
      },
      module: {
        rules: [
          {
            test: /\.(json5?|ya?ml)$/, // target json, json5, yaml and yml files
            loader: "@intlify/vue-i18n-loader",
            include: [
              // Use `Rule.include` to specify the files of locale messages to be pre-compiled
              _resolve(__dirname, "src/lang"),
            ],
          },
        ],
      },
      plugins: [],
    };
  },
};
