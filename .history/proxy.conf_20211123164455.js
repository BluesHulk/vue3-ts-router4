module.exports = {
  "/api": {
    target: `http://uat.lms.laihui.k8s`,
    // target: `http://192.168.17.12:8770`,
    // target: `http://192.168.17.10:8770`,
    ws: true,
    changeOrigin: true,
    pathRewrite: {
      ["^" + ""]: "",
    },
  },
};
