'use strict';

const httpProxy = require('http-proxy-middleware');
const k2c = require('koa2-connect');
const { pathToRegexp } = require('path-to-regexp');
const zlib = require('zlib');

const proxyMap = {
  test: {
    products: 'http://192.168.133.60/api',
    base: 'http://192.168.133.60/api'
  },

  prod: {
    products: 'http://192.168.133.60/api',
    base: 'http://192.168.133.60/api'
  }
};

const reallyIp = 'http://192.168.133.60/api';

module.exports = () => {
  const proxy = k2c(
    httpProxy({
      target: 'http://127.0.0.1',
      router(req) {
        let env = req.headers['x-env'];
        if (env !== 'prod') {
          env = 'test';
        }

        // const backendPrefix = pathToRegexp(/\/proxy\/([\w+]+)/).exec(req.url)[1];

        // reallyIp = `${proxyMap[env][backendPrefix]}`;

        return reallyIp;
      },
      changeOrigin: true,
      xfwd: true,
      pathRewrite: {
        '^/api/proxy/': '/'
      },
      logLevel: 'debug',
      onProxyRes(proxyRes, req, res) {
        const _end = res.end;
        let body = '';
        let buffer = new Buffer('');
        const isGzip = proxyRes.headers['content-encoding'] === 'gzip';
        proxyRes.on('data', data => {
          if (isGzip) {
            buffer = Buffer.concat([buffer, data]);
          } else {
            data = data.toString('utf-8');
            body += data;
          }
        });

        // Defer writeHead
        let _writeHeadArgs;
        res.writeHead = (...writeHeadArgs) => {
          _writeHeadArgs = writeHeadArgs;
        };

        res.write = () => {};

        res.end = (...endArgs) => {
          if (isGzip) {
            body = zlib.gunzipSync(buffer).toString('utf8');
            res.removeHeader('Content-Encoding');
          }
          const len = Buffer.byteLength(body);
          res.setHeader('X-Backend-IP', reallyIp);
          res.setHeader('Content-Length', len);
          res.removeHeader('transfer-encoding');
          res.writeHead.apply(res, _writeHeadArgs);
          if (body.length) {
            _end.apply(res, [body]);
          } else {
            _end.apply(res, endArgs);
          }
        };
        delete proxyRes.headers['Access-Control-Allow-Origin'];
        delete proxyRes.headers['access-control-allow-origin'];
        delete proxyRes.headers['transfer-encoding'];
      }
    })
  );

  return async function(ctx, next) {
    if (pathToRegexp(/^\/api\/proxy\//).exec(ctx.request.url)) {
      ctx.headers['x-env'] = ctx.app.config.env;
      try {
        // await ctx.checkLogin(next);
        ctx.headers.country = 91;
        const config = ctx.app.config.ssoAtome;
        console.log(config.host);
        // ctx.getLogger('accessLogger').info(`url:${ctx.request.url}`);
        await proxy(ctx, next);
      } catch (err) {
        const config = ctx.app.config.ssoAtome;
        ctx.response.type = 'json';
        ctx.body = {
          code: 2,
          data: `${config.host}/auth/sso/login?app_id=${config.appId}&version=1.0`,
          message: 'need login!'
        };
      }
    } else {
      await next();
    }
  };
};
