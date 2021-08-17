module.exports = {
  "/": {
    target: "http://192.168.17.244:18098", // 开发环境
    // target: 'http://192.168.17.12:8770',
    // target: 'http://192.168.17.10:8770',
    ws: true,
    changeOrigin: true,
  },
};
