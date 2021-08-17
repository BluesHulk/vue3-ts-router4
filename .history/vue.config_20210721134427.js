// eslint-disable-next-line @typescript-eslint/no-var-requires

module.exports = {
  devServer: {
    hot: true,
    open: true,
    proxy:
      process.env.NODE_ENV === "development" ? require("./proxy.conf") : {},
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  configureWebpack: {
    plugins: [],
    externals: {
      AMap: "AMap", // 高德地图配置
      AMapUI: "AMapUI",
    },
  },
  lintOnSave: false,
};
