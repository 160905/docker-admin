'use strict';

const Controller = require('egg').Controller;

class ImagesController extends Controller {
  async list() {
    const { ctx, app } = this;

    const images = await ctx.service.images.list();

    const body = {
      code: 200,
      msg: 'success',
      data: {
        config: app.config.swarm,
        data: {
          images,
          list: ctx.app.cache,
          config: app.config.swarm
        }
      }
    };
    ctx.body = body;
  }
}

module.exports = ImagesController;
