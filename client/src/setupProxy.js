require('dotenv').config({path:`${__dirname}/../../.env`});
const { createProxyMiddleware } = require('http-proxy-middleware');

const env= process.env

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: env.API,
            changeOrigin: true,
        })
    );
};