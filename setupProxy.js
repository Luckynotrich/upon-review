const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `${import.meta.env.SNOWPACK_PUBLIC_PROXY_URL}`,//'http://localhost:8081',
      changeOrigin: true,
    })
  );
console.log('createProxyMiddleware')};