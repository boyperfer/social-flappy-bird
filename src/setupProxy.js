const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/run",
    createProxyMiddleware({
      target: "http://localhost:5000/run",
      changeOrigin: true,
    })
  );
};
