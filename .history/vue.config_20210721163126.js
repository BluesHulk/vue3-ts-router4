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
      "/": {
        target: `http://192.168.17.244:18098`,
        // target: `http://192.168.17.12:8770`,
        // target: `http://192.168.17.10:8770`,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          ["^" + ""]: "",
        },
      },
    },
  },
};
