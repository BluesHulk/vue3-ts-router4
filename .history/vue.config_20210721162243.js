import { resolve } from "path";
import { resolve as _resolve } from "path";
import WebpackBar from "webpackbar";

import {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  title,
  devPort,
} from "./src/config/default/vue.custom.config";
export default {
  publicPath: "/",
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  devServer: {
    hot: true,
    port: devPort,
    open: true,
    noInfo: false,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [
        _resolve(__dirname, "src/styles/_variables.scss"),
        _resolve(__dirname, "src/styles/_mixins.scss"),
      ],
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
      plugins: [
        new WebpackBar({
          name: title,
        }),
      ],
    };
  },
};
