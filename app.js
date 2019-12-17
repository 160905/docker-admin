'use strict';

module.exports = app => {
  app.once('server', server => {
    // websocket
  });
  app.on('error', (err, ctx) => {
    ctx.logger.error(new Error(err));
  });
  app.on('request', ctx => {
    ctx.logger.info('some request data: %j', ctx.request.url);
  });
  app.on('response', ctx => {
    const used = Date.now() - ctx.starttime;
    app.logger.info('响应耗时 %d ms', used);
  });
  app.beforeStart(async () => {
    // preload before app start
  });
};
